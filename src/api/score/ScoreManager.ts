import Artist from "../../entities/artist/Artist";
import Track from "../../entities/track/Track";

class ScoreManager {
    isCurrentTrackGuessed(currentTrack: Track, trackAnswer: Track): boolean {
        const trackAnswerName = trackAnswer.name.toLocaleLowerCase();
        const currentTrackName = currentTrack.name.toLocaleLowerCase();

        if (trackAnswer && currentTrack) {
            return ((trackAnswer.id === currentTrack.id) || ((trackAnswerName === currentTrackName) && this.hasCommonArtists(currentTrack.artists, trackAnswer.artists)));
        }
        return false;
    }

    hasCommonArtists(currentArtists: Artist[], answerArtists: Artist[]): boolean {
        let hasCommonArtists = false;

        if (currentArtists.length === 1 && answerArtists.length === 1) {
            hasCommonArtists = this.hasTheSameArtists(currentArtists[0], answerArtists[0]);
        } else {
            currentArtists.forEach(currentArtist => {
                answerArtists.forEach(answerArtist => {
                    if (currentArtist.name === answerArtist.name) {
                        hasCommonArtists = true;
                    }
                });
            });
        }
        return hasCommonArtists;
    }

    hasTheSameArtists(currentArtist: Artist, answerArtist: Artist): boolean {
        return currentArtist.id === answerArtist.id;
    }
}

export default ScoreManager;