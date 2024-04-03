import React, { useEffect, useState } from 'react';
import style from "./SearchGenreComponent.module.css";
import useGTS from '../../hooks/useGTS';
import useGame from '../../hooks/useGame';
import useHttpCall from '../../hooks/useHttpCall';
interface SearchGenreProps {
    title: string;
}
const SearchGenreComponent: React.FC<SearchGenreProps> = ({ title }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [resultsList, setResultsList] = useState<string[]>([]);
    const { gtsState: { searchResultsGenres }, loadSearchResultsGenres } = useGTS();
    const { configurationGame: { isNewGenresSearch }, handleOnSelectGenre, handleIsCustomGenresConfig, handleIsNewGenresSearch } = useGame();
    const { checkAuthentication } = useHttpCall();

    const handleInputOnChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setSearchTerm(value);

        if (value) {
            checkAuthentication(loadSearchResultsGenres(value));
            handleIsNewGenresSearch(false);
        } else {
            handleIsNewGenresSearch(true);
        }
    }

    const handleGenreSelected = (genre: string) => {
        handleOnSelectGenre(genre);
        handleIsCustomGenresConfig(true);
        setSearchTerm('');
        handleIsNewGenresSearch(true);
    }

    useEffect(() => {
        if (isNewGenresSearch) setResultsList([])
        else searchResultsGenres ? setResultsList(searchResultsGenres) : setResultsList([]);

        return () => {
            setResultsList([]);
        }
    }, [searchResultsGenres, isNewGenresSearch])

    return (
        <div className={style.autocompleteContainer}>
            <input
                type="text"
                placeholder={title}
                value={searchTerm}
                onChange={handleInputOnChange}
            />
            <div className={style.resultsContainer}>
                <ul className={style.ulResults}>
                    {resultsList?.map((genreResult) => (
                        <div onClick={() => { handleGenreSelected(genreResult) }} key={genreResult}>
                            <li className={style.resultOption}> {genreResult} </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchGenreComponent