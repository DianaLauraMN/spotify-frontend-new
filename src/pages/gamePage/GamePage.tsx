import { useEffect } from 'react';
import style from "./GamePage.module.css";
import CardSelectSongComponent from "../../components/CardSelectSongComponent/CardSelectSongComponent";
import CardSongComponent from "../../components/cardSongComponent/CardSongComponent";
import useGame from "../../hooks/useGame";
import usePlay from "../../hooks/usePlay";
import CircleLoadingComponent from '../../components/utilitiesComponents/circleLoadingComponent/CircleLoadingComponent';

const GamePage = () => {
    const { playState: { score, asserts, isGameOver, failed }, handleOnChangeScore } = usePlay();
    const { configurationGame: { level, tracksQuantity, tracks, areTracksLoaded }, handleAreTracksLoaded } = useGame();

    useEffect(() => {
        const score = (asserts.length / tracksQuantity) * 100;
        const scoreFixed = score.toFixed(2);
        const castedScore = parseFloat(scoreFixed);
        handleOnChangeScore(castedScore);
        tracks && tracks?.length > 0 ? handleAreTracksLoaded(true) : handleAreTracksLoaded(false);
    }, [asserts, tracks, areTracksLoaded]);

    return (
        <div>
            {!areTracksLoaded && (
                <CircleLoadingComponent />
            )}

            {areTracksLoaded && (
                <div className={style.gamePageContainer}>
                    <div className={style.levelScoreContainer}>
                        <div className={style.levelContainer}>
                            <h2>Level</h2>
                            <h3>{level === 0 && 'Easy'}</h3>
                            <h3>{level === 1 && 'Normal'}</h3>
                            <h3>{level === 2 && 'Hard'}</h3>
                        </div>
                        <div className={style.scoreContainer}>
                            <h2 >Score</h2>
                            <h3 >{score} / 100</h3>
                        </div>
                    </div>
                    <div className={style.cardContainer}>
                        <div className={isGameOver && failed.length === 0 ? style.cardWinner : style.card1}>
                            <CardSongComponent />
                        </div>
                        <div className={style.card2}>
                            <CardSelectSongComponent />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default GamePage