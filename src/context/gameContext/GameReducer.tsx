import { Levels } from "../../api/enums/Levels";
import { ConfigurationGame, Steps } from "../../api/interfaces/InterfacesContext";
import Artist from "../../entities/artist/Artist";
import Track from "../../entities/track/Track";

export enum ConfigurationAction {
    SUBMIT_CONFIG = 0,
    CHANGE_LEVEL = 1,
    SELECT_GENRE = 2,
    SELECT_ARTIST = 3,
    CHANGE_BEGGINING = 4,
    CHANGE_DURATION_MS = 5,
    CHANGE_TRACKS_QUANTITY = 6,
    CHANGE_TRACK_ALREADY_GUESSED = 7,
    ACTIVE_LISTEN = 8,
    ACTIVE_GUESS = 9,
    ACTIVE_SONG = 10,
    TIME_LISTEN = 11,
    RESET_STATE = 12,
    CUSTOM_ARTISTS = 13,
    CUSTOM_GENRES = 14,
    NEW_TRACK_SEARCH = 15,
    NEW_ARTISTS_SEARCH = 16,
    NEW_GENRES_SEARCH = 17,
    CHANGE_STEP = 18,
    HANDLE_ARE_TRACKS_LOADED = 19,
    RESET_GAME_STEP = 20,
}

type gameAction =
    | { type: ConfigurationAction.SUBMIT_CONFIG, payload: Track[] | undefined }
    | { type: ConfigurationAction.CHANGE_LEVEL, payload: Levels }
    | { type: ConfigurationAction.SELECT_GENRE, payload: string }
    | { type: ConfigurationAction.SELECT_ARTIST, payload: Artist }
    | { type: ConfigurationAction.CHANGE_BEGGINING, payload: boolean }
    | { type: ConfigurationAction.CHANGE_DURATION_MS, payload: number }
    | { type: ConfigurationAction.CHANGE_TRACKS_QUANTITY, payload: number }
    | { type: ConfigurationAction.CHANGE_TRACK_ALREADY_GUESSED, payload: boolean }
    | { type: ConfigurationAction.ACTIVE_LISTEN, payload: boolean }
    | { type: ConfigurationAction.ACTIVE_GUESS, payload: boolean }
    | { type: ConfigurationAction.ACTIVE_SONG, payload: boolean }
    | { type: ConfigurationAction.TIME_LISTEN, payload: number }
    | { type: ConfigurationAction.RESET_STATE, payload: ConfigurationGame }
    | { type: ConfigurationAction.CUSTOM_ARTISTS, payload: boolean }
    | { type: ConfigurationAction.CUSTOM_GENRES, payload: boolean }
    | { type: ConfigurationAction.NEW_TRACK_SEARCH, payload: boolean }
    | { type: ConfigurationAction.NEW_ARTISTS_SEARCH, payload: boolean }
    | { type: ConfigurationAction.NEW_GENRES_SEARCH, payload: boolean }
    | { type: ConfigurationAction.CHANGE_STEP, payload: Steps }
    | { type: ConfigurationAction.HANDLE_ARE_TRACKS_LOADED, payload: boolean }
    | { type: ConfigurationAction.RESET_GAME_STEP, payload: ConfigurationGame }

export const GameReducer = (state: ConfigurationGame, action: gameAction): ConfigurationGame => {

    switch (action.type) {

        case ConfigurationAction.SUBMIT_CONFIG:
            let tracksAux: Track[] = [];
            if (action.payload) tracksAux = action.payload;

            return {
                ...state,
                tracks: tracksAux
            }

        case ConfigurationAction.CHANGE_LEVEL:
            return {
                ...state,
                level: action.payload
            }

        case ConfigurationAction.SELECT_GENRE:
            const stateGenres = [...state.genres];
            const genreToDelete = action.payload;
            const genreSelectedIndex = stateGenres.findIndex((genre) => genre === genreToDelete);

            genreSelectedIndex !== -1 ? stateGenres.splice(genreSelectedIndex, 1) : stateGenres.push(action.payload);

            return {
                ...state,
                genres: stateGenres,
            };

        case ConfigurationAction.SELECT_ARTIST:
            const stateArtists = [...state.artists];
            const artistIdToDelete = action.payload.id;
            const artistSelectedIndex = stateArtists.findIndex((artist) => artist.id === artistIdToDelete);

            artistSelectedIndex !== -1 ? stateArtists.splice(artistSelectedIndex, 1) : stateArtists.push(action.payload);

            return {
                ...state,
                artists: stateArtists,
            };

        case ConfigurationAction.CHANGE_BEGGINING:
            return {
                ...state,
                guessFromBeggining: action.payload
            }

        case ConfigurationAction.CHANGE_DURATION_MS:
            return {
                ...state,
                durationMs: (action.payload) //+1
            }

        case ConfigurationAction.CHANGE_TRACKS_QUANTITY:
            return {
                ...state,
                tracksQuantity: action.payload
            }

        case ConfigurationAction.CHANGE_TRACK_ALREADY_GUESSED:
            return {
                ...state,
                isTrackAlreadyGuessed: action.payload
            }

        case ConfigurationAction.ACTIVE_LISTEN:
            return {
                ...state,
                timerListen: { ...state.timerListen, active: action.payload },
                timerGuess: { ...state.timerGuess, active: false },
                timerSong: { ...state.timerSong, active: false }
            }

        case ConfigurationAction.ACTIVE_GUESS:
            return {
                ...state,
                timerGuess: { ...state.timerGuess, active: action.payload },
                timerListen: { ...state.timerListen, active: false },
                timerSong: { ...state.timerSong, active: false }
            }

        case ConfigurationAction.ACTIVE_SONG:
            return {
                ...state,
                timerSong: { ...state.timerSong, active: action.payload },
                timerGuess: { ...state.timerGuess, active: false },
                timerListen: { ...state.timerListen, active: false }
            }

        case ConfigurationAction.TIME_LISTEN:
            return {
                ...state,
                timerListen: { ...state.timerListen, time: action.payload }
            }


        case ConfigurationAction.CUSTOM_ARTISTS:
            return {
                ...state,
                isCustomArtistsConfig: action.payload,
            }

        case ConfigurationAction.CUSTOM_GENRES:
            return {
                ...state,
                isCustomGenresConfig: action.payload,
            }
        case ConfigurationAction.NEW_TRACK_SEARCH:
            return {
                ...state,
                isNewTracksSearch: action.payload
            }

        case ConfigurationAction.NEW_ARTISTS_SEARCH:
            return {
                ...state,
                isNewArtistsSearch: action.payload
            }

        case ConfigurationAction.NEW_GENRES_SEARCH:
            return {
                ...state,
                isNewGenresSearch: action.payload
            }

        case ConfigurationAction.CHANGE_STEP:
            return {
                ...state,
                gameStep: action.payload
            }

        case ConfigurationAction.HANDLE_ARE_TRACKS_LOADED:
            return {
                ...state,
                areTracksLoaded: action.payload
            }

        case ConfigurationAction.RESET_GAME_STEP:
            return {
                ...state,
                gameStep: action.payload.gameStep,
                timerListen: action.payload.timerListen,
                timerGuess: action.payload.timerGuess,
                timerSong: action.payload.timerSong,
            }

        case ConfigurationAction.RESET_STATE:
            return {
                ...state,
                level: action.payload.level,
                genres: action.payload.genres,
                artists: action.payload.artists,
                guessFromBeggining: action.payload.guessFromBeggining,
                durationMs: action.payload.durationMs,
                tracksQuantity: action.payload.tracksQuantity,
                tracks: action.payload.tracks,
                isTrackAlreadyGuessed: action.payload.isTrackAlreadyGuessed,
                timerListen: action.payload.timerListen,
                timerSong: action.payload.timerSong,
                timerGuess: action.payload.timerGuess,
                isCustomArtistsConfig: action.payload.isCustomArtistsConfig,
                isCustomGenresConfig: action.payload.isCustomGenresConfig,
                isNewTracksSearch: action.payload.isNewTracksSearch,
                isNewArtistsSearch: action.payload.isNewArtistsSearch,
                isNewGenresSearch: action.payload.isNewGenresSearch,
                gameStep: action.payload.gameStep,
                areTracksLoaded: action.payload.areTracksLoaded,
            }
        default:
            return state;
    }
}