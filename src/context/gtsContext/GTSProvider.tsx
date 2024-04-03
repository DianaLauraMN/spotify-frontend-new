import { useReducer } from "react";
import { IStateGTS, GTSContext } from "./GTSContext";
import { GTSReducer, GTSAction } from "./GTSReducer";
import { IApiUserControllerCalls } from "../../api/interfaces/IApiUser";
import { IApiArtistsControllerCalls } from "../../api/interfaces/IApiArtists";
import { IApiTracksControllerCalls } from "../../api/interfaces/IApiTracks";

import ApiUser from "../../api/ApiUser";
import ApiArtists from "../../api/ApiArtists";
import ApiTracks from "../../api/ApiTracks";

const apiUser: IApiUserControllerCalls = new ApiUser();
const apiArtists: IApiArtistsControllerCalls = new ApiArtists();
const apiTracks: IApiTracksControllerCalls = new ApiTracks();

interface props {
    children: JSX.Element | JSX.Element[];
}

const initial_state: IStateGTS = {
    user: null,
    userTopArtists: [],
    userTopGenresSeeds: [],
    tracksRecentlyPlayed: [],
    searchResultsTracks: [],
    searchResultsArtists: [],
    searchResultsGenres: [],
    spotifyGenres: [],
    scrollOnTop: false,
}

const GTSProvider = ({ children }: props) => {
    const [apiState, dispatch] = useReducer(GTSReducer, initial_state);

    const loadUserProfile = async () => {
        dispatch({ type: GTSAction.LOAD_USER_PROFILE, payload: await apiUser.getUserData() })
    }

    const loadUserTop6Artists = async () => {
        const topArtists = await apiArtists.getUserTopArtists();
        dispatch({ type: GTSAction.LOAD_USER_TOP_ARTISTS, payload: topArtists.length > 6 ? topArtists.slice(0, 6) : topArtists })
    }

    const loadUserTop6GenresSeeds = async () => {
        const topGenresSeeds = await apiTracks.getUserTopGenres();
        dispatch({ type: GTSAction.LOAD_USER_TOP_GENRES_SEEDS, payload: topGenresSeeds.length > 6 ? topGenresSeeds.slice(0, 6) : topGenresSeeds })
    }

    const loadTracksRecentlyPlayed = async () => {
        dispatch({ type: GTSAction.LOAD_TRACKS_RECENTLY_PLAYED, payload: await apiTracks.getUserTopTracks() })
    }

    const loadSearchResultsTracks = async (itemName: string) => {
        dispatch({ type: GTSAction.LOAD_TRACKS_ITEMS_SEARCHED_RESULTS, payload: await apiTracks.getTracksByName(itemName) })
    }

    const loadSearchResultsArtists = async (itemName: string) => {
        dispatch({ type: GTSAction.LOAD_ARTISTS_ITEMS_SEARCHED_RESULTS, payload: await apiArtists.getArtistsByName(itemName) })
    }
    const loadSpotifyGenres = async () => {
        dispatch({ type: GTSAction.LOAD_SPOTIFY_GENRES, payload: await apiTracks.getSpotifyGenres() })
    }

    const loadSearchResultsGenres = async (itemName: string) => {
        dispatch({ type: GTSAction.LOAD_GENRES_ITEMS_SEARCHED_RESULTS, payload: await apiTracks.getGenreByName(itemName) })
    }

    const cleanTracksResultsSearch = () => {
        dispatch({ type: GTSAction.CLEAN_RESULTS_SEARCH_TRACKS, payload: [] })
    }

    const cleanArtistsResultsSearch = () => {
        dispatch({ type: GTSAction.CLEAN_ARTISTS_SEARCH, payload: [] })
    }

    const handleScrollOnTop = (scrollOnTop: boolean) => {
        dispatch({ type: GTSAction.HANLDE_SCROLL_ON_TOP, payload: scrollOnTop })
    }

    const resetStateGTS = () => {
        dispatch({ type: GTSAction.RESET_STATE, payload: initial_state })
    }

    return (
        <GTSContext.Provider value={{
            gtsState: apiState,
            loadUserProfile,
            loadUserTop6Artists,
            loadUserTop6GenresSeeds,
            loadTracksRecentlyPlayed,
            loadSearchResultsTracks,
            loadSearchResultsArtists,
            loadSpotifyGenres,
            loadSearchResultsGenres,
            cleanTracksResultsSearch,
            resetStateGTS,
            cleanArtistsResultsSearch,
            handleScrollOnTop,
        }}>
            {children}
        </GTSContext.Provider>
    )
}

export default GTSProvider;