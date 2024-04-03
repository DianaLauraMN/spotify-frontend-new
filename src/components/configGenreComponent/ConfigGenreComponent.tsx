import { useEffect, useState } from "react";
import style from "./ConfigGenreComponent.module.css"
import useGame from "../../hooks/useGame";
import useGTS from "../../hooks/useGTS";
import GenericButtonComponent from "../utilitiesComponents/genericButton/GenericButtonComponent";
import SearchGenreComponent from "../searchGenreComponent/SearchGenreComponent";
import useHttpCall from "../../hooks/useHttpCall";

interface ConfigGenreProps {
    title: string;
}

const ConfigGenreComponent: React.FC<ConfigGenreProps> = ({ title }) => {
    const { configurationGame: { isCustomGenresConfig, genres }, handleOnSelectGenre: handleOnSelectGenres, handleIsCustomGenresConfig } = useGame();
    const { gtsState: { userTopGenresSeeds }, loadUserTop6GenresSeeds } = useGTS();
    const {checkAuthentication} =useHttpCall();
    const [genresLoaded, setGenresLoaded] = useState(false);
    const [genresConfig, setGenresConfig] = useState<string[]>([]);

    useEffect(() => {
        if (!genresLoaded) {
            checkAuthentication(loadUserTop6GenresSeeds());
            setGenresLoaded(true);
        }
        setGenresConfig(isCustomGenresConfig ? genres : userTopGenresSeeds)
        if (genres.length === 0) {
            setGenresConfig(userTopGenresSeeds);
            handleIsCustomGenresConfig(false);
        }
    }, [isCustomGenresConfig, userTopGenresSeeds, genres]);

    return (
        <div className={style.searchGenreContainer}>
            <div className={style.centerContainer}>
                <div className={style.inputContainer}>
                    <SearchGenreComponent title={title}
                    />
                </div>
                <div className={isCustomGenresConfig ? style.genresBtnsSelectedOptions : style.genresBtnsOptions}>
                    {
                        genresConfig?.map((genre, key) => (
                            <div key={key}>
                                <GenericButtonComponent
                                    text={genre}
                                    onClick={() => handleOnSelectGenres(genre)}
                                    isSelected={isCustomGenresConfig}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ConfigGenreComponent;

