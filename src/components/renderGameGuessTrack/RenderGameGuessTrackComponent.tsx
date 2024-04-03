import SongAnswerComponent from '../songAnswerComponent/SongAnswerComponent';
import CircularProgressWithLabel from '../circularProgressComponent/CircularProgressComponent';
import style from './RenderGameGuessTrackComponent.module.css'
import useGame from '../../hooks/useGame';
import AudioPlayerComponent from '../audioPlayerComponent/AudioPlayerComponent';
import Track from '../../entities/track/Track';

interface RenderGameGuessTrackComponentProps {
    track: Track;
}
const RenderGameGuessTrackComponent: React.FC<RenderGameGuessTrackComponentProps> = ({ track }) => {
    const { configurationGame: { durationMs, timerListen, timerSong, timerGuess, isTrackAlreadyGuessed } } = useGame();
    let { preview_url } = track;
    return (
        <div>
            {(timerSong.active || isTrackAlreadyGuessed) &&
                <div>
                    <AudioPlayerComponent
                        url={preview_url}
                        secondsToPlay={5}
                    />
                    <SongAnswerComponent
                        track={track} />
                </div>}
            {((timerListen.active || timerGuess.active) && (!isTrackAlreadyGuessed)) &&
                <div>
                    <AudioPlayerComponent
                        url={preview_url}
                        secondsToPlay={durationMs}
                    />
                    <div className={style.guessingContainer}>
                        <div className={style.circularTimerContainer}>
                            <CircularProgressWithLabel />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RenderGameGuessTrackComponent