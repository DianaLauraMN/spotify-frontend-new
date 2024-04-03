import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useGame from '../../hooks/useGame';
import WavesAudioComponent from '../wavesAudio/WavesAudioComponent';
import { Steps } from '../../api/interfaces/InterfacesContext';

const CircularProgressWithLabel: React.FC = () => {
  const { configurationGame: { durationMs, timerListen, gameStep }, handleOnGameStep } = useGame();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (gameStep === Steps.LISTEN) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= durationMs ? durationMs : prevProgress + 1));
      }, 1000);

      const timerId = setTimeout(() => {
        handleOnGameStep(Steps.GUESS);
      }, timerListen.time * 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(timerId);
      };

    }
  }, [gameStep]);

  const circularProgressStyle = {
    color: '#181818'
  };
  return (
    <>
      {(gameStep === Steps.LISTEN || gameStep === Steps.GUESS) &&
        <div>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={(progress / durationMs) * 100}
              size={300}
              thickness={1.2}
              sx={circularProgressStyle}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WavesAudioComponent />
            </Box>
          </Box>
        </div>
      }
    </>

  );
};

export default CircularProgressWithLabel;
