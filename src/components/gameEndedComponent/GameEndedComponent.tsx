import style from './GameEndedComponent.module.css'
import SpotifyButton from '../utilitiesComponents/spotifyButton/SpotifyButton'
import usePlay from '../../hooks/usePlay'
import useGame from '../../hooks/useGame';
import useGTS from '../../hooks/useGTS';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import iconFirstPlace from '../../img/icon-first-place-shadow.svg';
import ConfettiComponent from '../utilitiesComponents/confettiComponent/ConfettiComponent';
import victorySound from '../../sounds/first-place-sounds/success-fanfare-trumpets-6185.mp3';
import goodJobSound from '../../sounds/second-place-sounds/game-bonus-144751.mp3';
import tryAgainSound from '../../sounds/third-place-sounds/success-1-6297.mp3';
import loserSound from '../../sounds/loser-sounds/violin-lose-1-175615.mp3';
import AudioPlayerComponent from '../audioPlayerComponent/AudioPlayerComponent';

const GameEndedComponent = () => {
    const { resetStateGame } = useGame();
    const { playState: { score, failed }, resetStatePlay } = usePlay();
    const { gtsState: { user }, resetStateGTS } = useGTS();
    const [sound, setSound] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const assignResultsByScore = () => {
        if (score >= 0 && score <= 59) {
            setMessage('Try Again');
            score === 0 ? setSound(loserSound) : setSound(tryAgainSound);
        } else if (score >= 60 && score <= 99) {
            setSound(goodJobSound);
            setMessage('Good Job!');
        } else if (score === 100) {
            setSound(victorySound);
            setMessage('You own a perfect game!!');
        }
    }

    const handleOnClick = () => {
        resetStateGame();
        resetStatePlay();
        resetStateGTS();
        navigate('/configGame');
    }

    const capitalizeUserName = (name: string) => {
        return name.toLowerCase().replace(/(^|\s)\S/g, function (firstLetter) {
            return firstLetter.toUpperCase();
        });
    }

    useEffect(() => {
        assignResultsByScore();
    }, [])

    return (
        <div>
            {sound &&
                <AudioPlayerComponent
                    url={sound}
                    secondsToPlay={3}
                />
            }

            {failed.length > 0 &&
                <div className={style.failedTracksContainer}>
                    <div className={style.gameResultsContainer}>
                        <h1>{message}</h1>
                    </div>
                    <div className={style.scrollContainer}>
                        <div className={style.scrollContent}>
                            <div className={style.cards}>
                                {
                                    failed?.map((track, key) => (
                                        <div key={key}>

                                            <div id="cardSong" className={style.cardSong}>
                                                <div className={style.coverAlbum}>
                                                    <img src={track.album.images[0].url} alt="" />
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
            }

            {(failed.length === 0 && user) &&
                <div className={style.perfectGameContainer}>
                    <div className={style.perfectGameContent} >
                        <h4>{message}</h4>
                        <img src={iconFirstPlace} alt="" />
                        <h2>{capitalizeUserName(user?.name)}</h2>
                        <h3>Thank you for playing</h3>
                    </div>
                    <ConfettiComponent />
                </div>
            }

            <SpotifyButton
                title={'Play Again'}
                type={'gameOver'}
                onClick={handleOnClick}
            />
        </div>
    )
}

export default GameEndedComponent