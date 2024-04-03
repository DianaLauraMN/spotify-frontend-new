import React, { useEffect } from 'react'
import Track from '../../entities/track/Track';
import style from './SongAnswerComponent.module.css'
import useGame from '../../hooks/useGame';
import { Steps } from '../../api/interfaces/InterfacesContext';
interface songAnswerComponentProps {
    track: Track;
}
const SongAnswerComponent: React.FC<songAnswerComponentProps> = ({ track }) => {
    const { name, album, artists } = track;
    const coverAlbum = album?.images[0]?.url;
    const { handleOnGameStep, configurationGame: { timerSong, gameStep } } = useGame();

    useEffect(() => {
        if (gameStep === Steps.SONG) {
            const timer = setTimeout(() => {
                handleOnGameStep(Steps.NEXT_SONG);
            }, timerSong.time * 1000);

            return () => { clearTimeout(timer); };
        }
    }, [gameStep]);

    return (
        <>
            {gameStep === Steps.SONG &&
                <div>
                    <div className={style.albumCover}>
                        <img src={coverAlbum} alt="Album" />
                    </div>
                    <div className={style.albumDataContainer}>
                        <h2 className={style.titleSong}>{name}</h2>
                        <h3 className={style.artistSong}>
                            {artists.map((artist) => (
                                <React.Fragment key={artist.id}>{artist.name + ' '}</React.Fragment>
                            ))}
                        </h3>
                        <h3 className={style.albumSong}>{album.name}</h3>
                    </div>
                </div>
            }
        </>
    )
}

export default SongAnswerComponent