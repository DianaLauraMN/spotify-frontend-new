import { createContext } from "react";
import { ConfigurationGame, Steps } from "../../api/interfaces/InterfacesContext";
import Artist from "../../entities/artist/Artist";
import { Levels } from "../../api/enums/Levels";

export type GameContextProps = {
    configurationGame: ConfigurationGame;
    handleOnSubmitConfigGame: (configurationGame: ConfigurationGame) => void,
    handleOnChangeLevel: (level: Levels) => void;
    handleOnSelectGenre: (genre: string) => void;
    handleOnSelectArtist: (artist: Artist) => void;
    handleOnChangeGuessFrom: (beggining: boolean) => void;
    handleOnChangeHowManySec: (durationMs: number) => void;
    handleOnChangeHowManySongs: (tracksQuantity: number) => void;
    handleIsTrackAlreadyGuessed: (beggining: boolean) => void;
    handleOnActiveListen: (isListenActive: boolean) => void;
    activeListenTimer: (listenTime: number) => void;
    handleOnActiveGuess: (isGuessActive: boolean) => void;
    handleOnActiveSong: (isSongActive: boolean) => void;
    handleIsCustomArtistsConfig: (isCustom: boolean) => void;
    handleIsCustomGenresConfig: (isCustom: boolean) => void;
    handleIsNewTracksSearch: (isNewSearch: boolean) => void;
    handleIsNewArtistsSearch: (isNewSearch: boolean) => void;
    handleIsNewGenresSearch: (isNewSearch: boolean) => void;
    handleOnGameStep: (step: Steps) => void;
    handleAreTracksLoaded: (areTracksLoaded: boolean) => void;
    resetStateGame: () => void;
    resetGameStep: () => void;
}

export const GameContext = createContext<GameContextProps>({} as GameContextProps);