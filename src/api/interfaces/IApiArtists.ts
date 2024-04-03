import Artist from "../../entities/artist/Artist";

export interface IApiArtistsControllerCalls {
    getArtistById(artistId: string): Promise<Artist>;
    getArtistsByName(itemName: string): Promise<Artist[]>;
    getUserTopArtists(): Promise<Artist[]>;
}