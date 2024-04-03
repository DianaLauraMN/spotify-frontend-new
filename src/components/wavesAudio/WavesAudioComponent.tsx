import { useState, useEffect } from 'react';
import style from './WavesAudioComponent.module.css';
import useGame from '../../hooks/useGame';

const WavesAudioComponent = () => {
    const [stopAnimation, setStopAnimation] = useState(false);
    const { configurationGame: { durationMs } } = useGame();

    useEffect(() => {
        const timer = setTimeout(() => {
            setStopAnimation(true);
        }, durationMs * 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={style.music}>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
            <div className={`${style.bar} ${stopAnimation ? '' : style.wave}`}></div>
        </div>
    );
}

export default WavesAudioComponent;
