import Artist from "../../entities/artist/Artist";
import Track from "../../entities/track/Track";
import { Levels } from "../enums/Levels";

export enum Steps {
    LISTEN = 1,
    GUESS = 2,
    SONG = 3,
    NEXT_SONG = 4,
}

export interface ConfigurationGame {
    level: Levels;
    genres: string[];
    artists: Artist[];
    guessFromBeggining: boolean;
    durationMs: number;
    tracksQuantity: number;
    tracks?: Track[];
    isTrackAlreadyGuessed: boolean;
    isCustomArtistsConfig: boolean;
    isCustomGenresConfig: boolean;
    isNewTracksSearch: boolean,
    isNewArtistsSearch: boolean,
    isNewGenresSearch: boolean,
    areTracksLoaded: boolean,

    timerListen: {
        time: number,
        active: boolean,
    }
    timerSong: {
        time: number,
        active: boolean,
    }
    timerGuess: {
        time: number,
        active: boolean,
    }
    gameStep: Steps,
}
