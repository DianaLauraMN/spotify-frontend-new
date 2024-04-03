import axios from "axios";
import { ConfigurationGame } from "../interfaces/InterfacesContext";
import { getTracksLsitTyped } from "../ApiTracks";
import Track from "../../entities/track/Track";
import Global from "../../Global/Global";

const urlBase = Global.urlBase;

class ApiGame {
    async getTracksByLevel(configurationGame: ConfigurationGame) {
        try {
            const token = localStorage.access_token;
            const response = await axios.post(`${urlBase}/tracksByLevel`, {
                configurationGame: configurationGame,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const tracksTyped = getTracksLsitTyped(response.data);
            return tracksTyped;
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentTrackResult(currentTrack: Track, trackAnswer: Track) {
        try {
            const response = await axios.get(`${urlBase}/track/score`, {
                params: {
                    currentTrack: JSON.stringify(currentTrack),
                    trackAnswer: JSON.stringify(trackAnswer),
                }
            });

            const { assert } = response.data;
            return assert;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ApiGame;