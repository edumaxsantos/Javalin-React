import React, {useState} from 'react';
import './App.css';
import {makeReservation, checkReservation} from './api';

function App() {

  const [day, setDay] = useState('saturday');
  const [time, setTime] = useState('8:00 PM');

  function onSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('day', day);
    params.append('time', time);
    makeReservation(params)
    .then(response => {
      if(response.status === 200)
        alert(response.data);
    })
    .catch(console.log);
  }

  function onCheckReservation(event) {
    event.preventDefault();

    checkReservation(day)
    .then(response => {
      if(response.status === 200)
        alert(response.data);
      console.log(response);
    })
    .catch(console.log);
  }

  return (
    <div className="App">
      <h2>Make reservation:</h2>
      <form onSubmit={onSubmit}>
        Choose day
        <select value={day} onChange={(event) => setDay(event.target.value)}>
          <option value="saturday">Saturday</option>
          <option valu="sunday">Sunday</option>
        </select>
        <br />
        Choose time
        <select value={time} onChange={event => setTime(event.target.value)}>
          <option value="8:00 PM">8:00 PM</option>
          <option value="9:00 PM">9:00 PM</option>
        </select>
        <br />
        <button>Submit</button>
      </form>
      <h2>Check your reservation:</h2>
      <form onSubmit={onCheckReservation}>
        Choose day
        <select value={day} onChange={(event) => setDay(event.target.value)}>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
