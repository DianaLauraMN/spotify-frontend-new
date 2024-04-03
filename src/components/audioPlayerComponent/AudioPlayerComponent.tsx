import React, { useRef, useEffect } from "react";

interface AudioPlayerComponentProps {
    url: string;
    secondsToPlay: number;
}

const AudioPlayerComponent: React.FC<AudioPlayerComponentProps> = ({ url, secondsToPlay }) => {
    let audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            const timerId = setTimeout(() => {
                pauseSong();
            }, (secondsToPlay) * 1000);
            return () => clearTimeout(timerId);
        }
    }, [url, secondsToPlay]);

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    return (
        <audio autoPlay ref={audioRef}>
            <source src={url} type="audio/mpeg" />
            Your browser doesn't support audio player.
        </audio>
    )
}

export default AudioPlayerComponent;
