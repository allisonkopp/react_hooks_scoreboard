import React, { useState, useEffect } from 'react';

const Stopwatch = _ => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);

  const tick = _ => {
    if (!isRunning) return;
    const now = Date.now();
    setPreviousTime(now);
    setElapsedTime(prevElapsedTime => prevElapsedTime + (now - previousTime));
  };

  useEffect(
    _ => {
      const intervalId = setInterval(tick, 100);
      return _ => clearInterval(intervalId);
    },
    [tick] //passed as the dependency
  );

  const handleStopwatch = _ => {
    if (!isRunning) setPreviousTime(Date.now());
    setIsRunning(prevState => !prevState.isRunning);
  };

  const handleReset = _ => setElapsedTime(0);

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
