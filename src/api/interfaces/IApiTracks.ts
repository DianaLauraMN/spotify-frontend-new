import Track from "../../entities/track/Track";

export interface IApiTracksControllerCalls {
    getTrackById(trackId: string): Promise<Track>;
    getTracksByName(itemName: string): Promise<Track[]>;
    getUserTopTracks(): Promise<Track[]>;
    getArtistTopTracks(itemName: string): Promise<Track[]>;
    getArtistAllTracks(itemName: string): Promise<Track[]>;
    getUserPlaylistsTracks(): Promise<Track[]>;
    getUserSavedTracks(): Promise<Track[]>;
    getUserRecommendations(): Promise<Track[]>;
    getUserTopGenresTracks(): Promise<Track[]>;
    getUserTopGenres(): Promise<string[]>;
    getSpotifyGenres(): Promise<string[]>;
    getGenreByName(itemName: string): Promise<string[]>;
}