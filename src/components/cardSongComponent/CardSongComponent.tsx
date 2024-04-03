import style from "./CardSongComponent.module.css";
import { useEffect } from "react";
import usePlay from "../../hooks/usePlay";
import useGame from "../../hooks/useGame";
import RenderGameGuessTrackComponent from "../renderGameGuessTrack/RenderGameGuessTrackComponent";
import useGTS from "../../hooks/useGTS";
import { Steps } from "../../api/interfaces/InterfacesContext";
import GameEndedComponent from "../gameEndedComponent/GameEndedComponent";

const CardSongComponent = () => {
    const { cleanTracksResultsSearch: cleanSearch, handleScrollOnTop } = useGTS();
    const { playState: { currentTrackIndex, isGameOver, trackAnswer, failed }, handleOnChangeCurrentTrack, handleOnChangeCurrentTrackIndex, restartGameValue, toggleIsGameOver, handleOnChangeFailed } = usePlay();
    const { configurationGame: { timerListen, timerSong, timerGuess, tracks, gameStep }, handleIsNewTracksSearch, resetGameStep } = useGame();

    if (!tracks) { throw new Error('Game Tracks empty') }
    const currentTrackAux = tracks[currentTrackIndex];

    useEffect(() => {
        if (!isGameOver) {
            if (gameStep === Steps.NEXT_SONG) {
                resetGameStep();

                if (trackAnswer === null && currentTrackAux) {
                    handleOnChangeFailed(currentTrackAux);
                }
                handleScrollOnTop(true);
                startGuessing();
            } else {
                const timerId = setTimeout(() => {
                    startGuessing();
                }, timerToLoadNextTrack());
                return () => clearTimeout(timerId);
            }
        }
    }, [isGameOver, gameStep]);

    useEffect(() => {
        handleOnChangeCurrentTrack(currentTrackAux);
    }, [tracks, currentTrackAux]);

    const timerToLoadNextTrack = () => {
        return ((timerListen.time * 1000) + (timerGuess.time * 1000) + (timerSong.time * 1000))
    }

    const startGuessing = () => {
        cleanSearch();
        restartGameValue('trackAnswer');
        handleOnChangeCurrentTrackIndex(currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0);
        if (currentTrackIndex === tracks.length - 1) {
            toggleIsGameOver(true);
        } else {
            handleIsNewTracksSearch(true);
        }
    }

    return (
        <div className={(isGameOver && failed.length === 0) ? style.gradient : style.cardSongContainer}>
            <div className={style.titleContainer}>
                <h1>Guess The Song</h1>
            </div>
            <div className={style.trackContainer}>
                {currentTrackAux && (
                    <div>
                        {isGameOver &&
                            <GameEndedComponent />
                        }
                        {(!isGameOver) &&
                            <div>
                                <RenderGameGuessTrackComponent
                                    track={currentTrackAux}
                                />
                            </div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardSongComponent;
