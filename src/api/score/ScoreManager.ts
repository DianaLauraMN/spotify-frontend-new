import Artist from "../../entities/artist/Artist";
import Track from "../../entities/track/Track";

class ScoreManager {
    isCurrentTrackGuessed(currentTrack: Track, trackAnswer: Track): boolean {
        const trackAnswerName = trackAnswer.name.toLocaleLowerCase();
        const currentTrackName = currentTrack.name.toLocaleLowerCase();

        if (trackAnswer && currentTrack) {
            return ((trackAnswer.id === currentTrack.id) || ((trackAnswerName === currentTrackName) && this.hasCommonArtists(currentTrack.artists, trackAnswer.artists))
                || (currentTrackName.includes(trackAnswerName) && this.hasCommonArtists(currentTrack.artists, trackAnswer.artists)));
        }
        return false;
    }

    hasCommonArtists(currentArtists: Artist[], answerArtists: Artist[]): boolean {
        currentArtists.forEach(currentArtist => {
            answerArtists.forEach(answerArtist => {
                return currentArtist.name === answerArtist.name ? true : false;
            });
        });
        return false;
    }
}

export default ScoreManager;