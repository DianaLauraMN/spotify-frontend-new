import { useEffect, useState } from "react";
import style from "./ConfigArtistComponent.module.css"
import useGame from "../../hooks/useGame";
import useGTS from "../../hooks/useGTS";
import GenericButtonComponent from "../utilitiesComponents/genericButton/GenericButtonComponent";
import SearchArtistsComponent from "../searchArtistsComponent/SearchArtistsComponent";
import Artist from "../../entities/artist/Artist";
import useHttpCall from "../../hooks/useHttpCall";

interface ConfigArtistProps {
  title: string;
}

const ConfigArtistComponent: React.FC<ConfigArtistProps> = ({ title }) => {
  const { configurationGame: { isCustomArtistsConfig, artists }, handleOnSelectArtist, handleIsCustomArtistsConfig } = useGame();
  const { gtsState: { userTopArtists }, loadUserTop6Artists } = useGTS();
  const {checkAuthentication} =useHttpCall();
  const [artistsLoaded, setArtistsLoaded] = useState(false);
  const [artistsConfig, setArtistsConfig] = useState<Artist[]>([])

  useEffect(() => {
    if (!artistsLoaded) {
      checkAuthentication(loadUserTop6Artists());
      setArtistsLoaded(true);
    }
    setArtistsConfig(isCustomArtistsConfig ? artists : userTopArtists);

    if (artists.length === 0) {
      setArtistsConfig(userTopArtists);
      handleIsCustomArtistsConfig(false);
    }
  }, [isCustomArtistsConfig, userTopArtists, artists]);

  return (
    <div className={style.searchArtistContainer}>
      <div className={style.centerContainer}>
        <div className={style.inputContainer}>
          <SearchArtistsComponent title={title} />
        </div>
        <div>
          <div className={isCustomArtistsConfig ? style.artistsBtnSelectedOptions : style.artistsBtnOptions}>
            {
              artistsConfig?.map((artist, key) => (
                <div key={key}>
                  <GenericButtonComponent
                    text={artist.name}
                    onClick={() => handleOnSelectArtist(artist)}
                    isSelected={isCustomArtistsConfig} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigArtistComponent
