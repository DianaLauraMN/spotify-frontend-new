import { useReducer } from "react";
import { ConfigurationGame, Steps } from "../../api/interfaces/InterfacesContext";
import { GameContext } from "./GameContext";
import { ConfigurationAction, GameReducer } from "./GameReducer";
import Artist from "../../entities/artist/Artist";
import ApiGame from "../../api/levels/ApiGame";
import { Levels } from "../../api/enums/Levels";

const apiGame = new ApiGame();

interface props {
    children: JSX.Element | JSX.Element[];
}

const initial_state: ConfigurationGame = {
    level: Levels.EASY,
    genres: [],
    artists: [],
    guessFromBeggining: false,
    durationMs: 5,
    tracksQuantity: 10,
    tracks: [],
    isTrackAlreadyGuessed: false,
    areTracksLoaded: false,

    timerListen: {
        time: 5,
        active: true
    },
    timerSong: {
        time: 5,
        active: false
    },
    timerGuess: {
        time: 10,
        active: false
    },
    gameStep: Steps.LISTEN,

    isCustomArtistsConfig: false,
    isCustomGenresConfig: false,
    isNewTracksSearch: true,
    isNewArtistsSearch: false,
    isNewGenresSearch: false,
}

const GameProvider = ({ children }: props) => {
    const [configurationGame, dispatch] = useReducer(GameReducer, initial_state);

    const handleOnSubmitConfigGame = async (configurationGame: ConfigurationGame) => {
        const tracks = await apiGame.getTracksByLevel(configurationGame);
        dispatch({ type: ConfigurationAction.SUBMIT_CONFIG, payload: tracks });
    }
    const handleOnChangeLevel = (level: Levels) => {
        dispatch({ type: ConfigurationAction.CHANGE_LEVEL, payload: level })
    }
    const handleOnSelectGenre = (genre: string) => {
        dispatch({ type: ConfigurationAction.SELECT_GENRE, payload: genre })
    }
    const handleOnSelectArtist = (artist: Artist) => {
        dispatch({ type: ConfigurationAction.SELECT_ARTIST, payload: artist })
    }
    const handleOnChangeGuessFrom = (beggining: boolean) => {
        dispatch({ type: ConfigurationAction.CHANGE_BEGGINING, payload: beggining })
    }
    const handleOnChangeHowManySec = (durationMs: number) => {
        dispatch({ type: ConfigurationAction.CHANGE_DURATION_MS, payload: durationMs })
    }
    const handleOnChangeHowManySongs = (tracksQuantity: number) => {
        dispatch({ type: ConfigurationAction.CHANGE_TRACKS_QUANTITY, payload: tracksQuantity })
    }
    const handleIsTrackAlreadyGuessed = (isAlreadyGuessed: boolean) => {
        dispatch({ type: ConfigurationAction.CHANGE_TRACK_ALREADY_GUESSED, payload: isAlreadyGuessed })
    }
    const activeListenTimer = (listenTime: number) => {
        dispatch({ type: ConfigurationAction.TIME_LISTEN, payload: listenTime })
    }
    const handleOnActiveListen = (isActiveListen: boolean) => {
        dispatch({ type: ConfigurationAction.ACTIVE_LISTEN, payload: isActiveListen })
    }
    const handleOnActiveGuess = (isGuessActive: boolean) => {
        dispatch({ type: ConfigurationAction.ACTIVE_GUESS, payload: isGuessActive })
    }
    const handleOnActiveSong = (isSongActive: boolean) => {
        dispatch({ type: ConfigurationAction.ACTIVE_SONG, payload: isSongActive })
    }
    const resetStateGame = () => {
        dispatch({ type: ConfigurationAction.RESET_STATE, payload: initial_state });
    }
    const handleIsCustomArtistsConfig = (isCustom: boolean) => {
        dispatch({ type: ConfigurationAction.CUSTOM_ARTISTS, payload: isCustom })
    }
    const handleIsCustomGenresConfig = (isCustom: boolean) => {
        dispatch({ type: ConfigurationAction.CUSTOM_GENRES, payload: isCustom })
    }
    const handleIsNewTracksSearch = (isNewSearch: boolean) => {
        dispatch({ type: ConfigurationAction.NEW_TRACK_SEARCH, payload: isNewSearch });
    }
    const handleIsNewArtistsSearch = (isNewSearch: boolean) => {
        dispatch({ type: ConfigurationAction.NEW_ARTISTS_SEARCH, payload: isNewSearch });
    }
    const handleIsNewGenresSearch = (isNewSearch: boolean) => {
        dispatch({ type: ConfigurationAction.NEW_GENRES_SEARCH, payload: isNewSearch });
    }
    const handleAreTracksLoaded = (areTracksLoaded: boolean) => {
        dispatch({ type: ConfigurationAction.HANDLE_ARE_TRACKS_LOADED, payload: areTracksLoaded });
    }
    const handleOnGameStep = (step: Steps) => {
        dispatch({ type: ConfigurationAction.CHANGE_STEP, payload: step });
        switch (step) {
            case 1:
                dispatch({ type: ConfigurationAction.ACTIVE_LISTEN, payload: true });
                break;
            case 2:
                dispatch({ type: ConfigurationAction.ACTIVE_GUESS, payload: true });
                break;
            case 3:
                dispatch({ type: ConfigurationAction.ACTIVE_SONG, payload: true });
                break;
            default:
                break;
        }
    }

    const resetGameStep = () => {
        dispatch({ type: ConfigurationAction.RESET_GAME_STEP, payload: initial_state });
    }

    return (
        <GameContext.Provider value={{
            configurationGame,
            handleOnSubmitConfigGame,
            handleOnChangeLevel,
            handleOnSelectGenre,
            handleOnSelectArtist,
            handleOnChangeGuessFrom,
            handleOnChangeHowManySec,
            handleOnChangeHowManySongs,
            handleIsTrackAlreadyGuessed,
            handleOnActiveListen,
            handleOnActiveGuess,
            handleOnActiveSong,
            activeListenTimer,
            resetStateGame,
            handleIsCustomArtistsConfig,
            handleIsCustomGenresConfig,
            handleIsNewTracksSearch,
            handleIsNewArtistsSearch,
            handleIsNewGenresSearch,
            handleOnGameStep,
            handleAreTracksLoaded,
            resetGameStep,
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;