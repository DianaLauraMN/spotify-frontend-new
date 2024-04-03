import { useState, useEffect } from 'react';
import style from "./SearchArtistsComponent.module.css"
import useGTS from '../../hooks/useGTS';
import useGame from '../../hooks/useGame';
import Artist from '../../entities/artist/Artist';
import TimerCallApi from '../utilitiesComponents/timerCallApi/TimerCallApi';
import useHttpCall from '../../hooks/useHttpCall';
interface SearchArtistsProps {
  title: string;
}

const SearchArtistsComponent: React.FC<SearchArtistsProps> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [resultsList, setResultsList] = useState<Artist[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { checkAuthentication } = useHttpCall();

  const { gtsState: { searchResultsArtists }, loadSearchResultsArtists, cleanArtistsResultsSearch } = useGTS();
  const { configurationGame: { isNewArtistsSearch }, handleOnSelectArtist, handleIsCustomArtistsConfig, handleIsNewArtistsSearch } = useGame();

  const { increment, time, setTime, isTimerOn } = TimerCallApi();

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    if (value === '' || value === " ") {//agregar RegEX
      handleIsNewArtistsSearch(true);
      setIsFetching(false);
    }
    setSearchTerm(value);
    increment();
  };

  const handleArtistSelected = (artist: Artist) => {
    handleOnSelectArtist(artist);
    handleIsCustomArtistsConfig(true);
    setSearchTerm('');
    handleIsNewArtistsSearch(true);
  }

  const handleApiCall = () => {
    if ((searchTerm != prevSearchTerm) && isFetching) {
      cleanArtistsResultsSearch();
      checkAuthentication(loadSearchResultsArtists(searchTerm));
      setPrevSearchTerm(searchTerm);
      handleIsNewArtistsSearch(false);
    } else {
      handleIsNewArtistsSearch(true);
    }
  }

  useEffect(() => {
    if (isFetching && searchTerm) handleApiCall();

    if (isTimerOn) {
      const interval = setInterval(() => {
        if (time < 1) {
          setTime(prevTime => prevTime + 1);
        } else if (time == 1) {
          setIsFetching(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, isFetching])

  useEffect(() => {
    if (isNewArtistsSearch) setResultsList([]);
    else searchResultsArtists ? setResultsList(searchResultsArtists) : setResultsList([]);

    return () => {
      setResultsList([]);
    }
  }, [searchResultsArtists, isNewArtistsSearch]);

  return (
    <div className={style.autocompleteContainer}>
      <input
        type="text"
        placeholder={title}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className={style.resultsContainer}>
        <ul className={style.ulResults}>
          {resultsList?.map((artistResult) => (
            <div onClick={() => { handleArtistSelected(artistResult) }} key={artistResult.id}>
              <li className={style.resultOption}>
                <img src={artistResult.images[0]?.url} />
                <h5>{artistResult.name}</h5>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default SearchArtistsComponent