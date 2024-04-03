import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';

const ConfettiComponent: React.FC = () => {
  const { width, height } = useWindowSize()

  return (
    <div>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default ConfettiComponent;
