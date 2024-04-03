import style from "./TracksListedComponent.module.css"
import React, { useEffect, useRef, useState } from "react";
import useGTS from "../../hooks/useGTS";
import Track from "../../entities/track/Track";
import usePlay from "../../hooks/usePlay";
import useGame from "../../hooks/useGame";
import { Steps } from "../../api/interfaces/InterfacesContext";
import ScoreManager from "../../api/score/ScoreManager";
import useHttpCall from "../../hooks/useHttpCall";

const TrackListedComponent = () => {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [trackCardEnabled, setTrackCardEnabled] = useState(true);
    const [tracksRecPlayedLoaded, setTracksRecPlayedLoaded] = useState(false);
    const { checkAuthentication } = useHttpCall();

    const { gtsState: { tracksRecentlyPlayed, searchResultsTracks, scrollOnTop: isScrollOnTop }, loadTracksRecentlyPlayed, handleScrollOnTop } = useGTS();
    const { playState: { trackAnswer, currentTrack, isGameOver }, handleOnChangeAsserts, handleOnChangeFailed, handleOnChangeTrackAnswer } = usePlay();
    const { handleIsTrackAlreadyGuessed, handleOnGameStep } = useGame();

    const scrollContentRef = useRef<HTMLDivElement>(null);
    const scoreManager = new ScoreManager();
    let assertedTrack = false;

    useEffect(() => {
        if (!tracksRecPlayedLoaded) {
            checkAuthentication(loadTracksRecentlyPlayed());
            setTracksRecPlayedLoaded(true);
        }
        if (trackAnswer) handleOnGameStep(Steps.SONG);
        trackAnswer ? handleIsTrackAlreadyGuessed(true) : handleIsTrackAlreadyGuessed(false);
        trackAnswer ? setTrackCardEnabled(false) : setTrackCardEnabled(true);
        assignGameResults();
    }, [trackAnswer]);

    useEffect(() => {
        if (isScrollOnTop && scrollContentRef.current) {
            scrollContentRef.current.scrollTop = 0;
            handleScrollOnTop(false);
        }
        searchResultsTracks.length > 0 ? setSearchResults(searchResultsTracks) : setSearchResults(tracksRecentlyPlayed);
    }, [searchResultsTracks, tracksRecentlyPlayed, isScrollOnTop]);


    const assignGameResults = () => {
        if (trackAnswer && currentTrack) {
            assertedTrack = scoreManager.isCurrentTrackGuessed(currentTrack, trackAnswer);
            assertedTrack ? handleOnChangeAsserts(currentTrack) : handleOnChangeFailed(currentTrack);
        }
    }

    return (
        <div className={style.recentlyPlayedContainer}>
            <div className={style.scrollContainer}>
                <div className={style.scrollContent} ref={scrollContentRef} >
                    <div className={style.cards}>
                        {
                            searchResults.map((track, key) => (
                                <div key={key}>

                                    <div id="cardSong" className={style.cardSong} onClick={() => {
                                        if (trackCardEnabled && (!isGameOver)) handleOnChangeTrackAnswer(track);
                                    }}>
                                        <div className={style.coverAlbum}>
                                            <img src={track.album.images[0]?.url} alt="Cover Album" />
                                        </div>
                                        <div className={style.albumData}>
                                            <h3>{track.name}</h3>
                                            <h4>
                                                {track.artists.map((artist) => (
                                                    <React.Fragment key={artist.id}>{artist.name + ' '}</React.Fragment>
                                                ))}
                                            </h4>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackListedComponent