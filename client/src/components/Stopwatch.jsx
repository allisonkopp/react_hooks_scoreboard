import React, { useState, useEffect } from 'react';

const Stopwatch = _ => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);

  useEffect(_ => {
    const intervalId = setInterval(_ => tick(), 100);
    return _ => clearInterval(intervalId);
  }, []);

  const tick = _ => {
    if (isRunning) {
      const now = Date.now();
      setPreviousTime(now);
      setElapsedTime(prevState => prevState.elapsedTime + (now - previousTime));
    }
  };

  const handleStopwatch = _ => {
    setIsRunning(prevState => !prevState.isRunning);
    if (!isRunning) setPreviousTime(Date.now());
  };

  const handleReset = _ => setElapsedTime(0);

  console.log(elapsedTime);
  const seconds = Math.floor(elapsedTime / 1000);

  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <span className="stopwatch-time">{seconds}</span>
      <button onClick={handleStopwatch}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
