import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { data } from './data';
import Header from './components/Header';
import Players from './components/Players';
import Form from './components/Form';
import PlayerDetail from './components/PlayerDetail';

const App = _ => {
  const [players, setPlayers] = useState(data);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(-1);

  const fetchPlayers = async _ => {
    const { data } = await axios.get('/characters');
    const parsedPlayers = data.results.map(({ name }) => ({
      id: Math.ceil(Math.random() * 1000000),
      name,
      age: Math.ceil(Math.random() * 18),
      score: Math.ceil(Math.random() * 10)
    }));
    setPlayers([...players, ...parsedPlayers]);
  };

  useEffect(_ => {
    fetchPlayers();
  }, []); //Second argument needs to be an empty array for useEffect to act as componentDidMount

  const addPlayer = ({ name, age }) => {
    const newPlayer = {
      id: players.length,
      name,
      age,
      score: 0
    };
    const newPlayerList = [newPlayer, ...players];
    setPlayers(newPlayerList);
  };

  const removePlayer = id => {
    const filteredPlayerList = players.length && players.filter(player => player.id !== id);
    setPlayers(filteredPlayerList);
  };

  const selectPlayer = id => setSelectedPlayerIndex(id);

  const updatePlayerScore = (id, change) => {
    const updatedPlayerList =
      players.length &&
      players.map(player => (player.id === id ? { ...player, score: (player.score += change) } : player));
    setPlayers(updatedPlayerList);
  };

  const getHighScore = _ => {
    const scores = players.length && players.map(player => player.score);
    const highScore = scores && Math.max(...scores);
    if (highScore) return highScore;
  };

  const highScore = getHighScore();
  const playerCount = players.length;
  const totalPoints = players.length && players.reduce((acc, player) => acc + player.score, 0);
  const selectedPlayer = selectedPlayerIndex !== -1 && players[selectedPlayerIndex];

  return (
    <div className="scoreboard">
      <Header totalPoints={totalPoints} playerCount={playerCount} />
      <Players
        players={players}
        removePlayer={removePlayer}
        updatePlayerScore={updatePlayerScore}
        selectPlayer={selectPlayer}
        highScore={highScore}
      />
      <Form addPlayer={addPlayer} />
      <PlayerDetail selectedPlayer={selectedPlayer} />
    </div>
  );
};

export default App;
