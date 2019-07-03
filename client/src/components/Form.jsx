import React, { useState } from 'react';

const Form = _ => {
  const [name, setName] = useState(String());
  const [age, setAge] = useState(String());

  const handleSubmit = e => {
    e.preventDefault();
    const newPlayer = { name, age };
    this.props.addPlayer(newPlayer);
    setName(String());
    setAge(String());
  };

  return (
    <div className="add-player-form">
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Player Name" />
        <input type="text" value={age} onChange={e => setAge(e.target.value)} placeholder="Player Age" />
        <input type="submit" value="Add Player" />
      </form>
    </div>
  );
};

export default Form;
