import React, { useState, useEffect } from 'react';

interface TimerProps {
  startValue: number; 
  stopTest:any
}

const Timer: React.FC<TimerProps> = ({ startValue, stopTest }) => {
//   const [time, setTime] = useState(startValue);

  useEffect(() => {
    const interval = setInterval(() => {
        stopTest((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-white text-black p-2 rounded-lg '>
      <h2>Timer: {startValue} seconds</h2>
    </div>
  );
};

export default Timer;