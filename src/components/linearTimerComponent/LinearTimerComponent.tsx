import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useGame from '../../hooks/useGame';
import { Steps } from '../../api/interfaces/InterfacesContext';

const LinearTimerComponent = () => {
    const [progress, setProgress] = React.useState(0);
    const { configurationGame: { timerGuess, gameStep }, handleOnGameStep } = useGame();
    const progressInterval = (100 / timerGuess.time);
    let timerToChangeStep = (timerGuess.time + 1) * 1000;

    useEffect(() => {
        if (gameStep === Steps.GUESS) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    return Math.min(oldProgress + 1, 10);
                });
            }, 1000);

            const timerId = setTimeout(() => {
                handleOnGameStep(Steps.SONG);
            }, timerToChangeStep);

            return () => {
                clearInterval(timer);
                clearTimeout(timerId)
            };

        } else {
            setProgress(0);
        }

    }, [gameStep]);

    const backgroundStyle = {
        background: '#121212',
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
        height: '.3rem',
    };

    const filledStyle = {
        background: 'linear-gradient(to right, #532FE0, #D63372)',
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
        height: '.3rem',
    };

    return (
        <>
            {gameStep === Steps.GUESS &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={progress * progressInterval}
                        sx={{
                            ...backgroundStyle,
                            '& .MuiLinearProgress-bar': filledStyle,
                        }}
                    />
                </Box>
            }
        </>
    );
}

export default LinearTimerComponent