import './App.css';
import Die from './components/die/Die'
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);


  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  React.useEffect(function(){
  
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;

    const allSameValue = dice.every(die => die.value === firstValue);

    if(allHeld && allSameValue){
      setTenzies(true);
      console.log('you won!')
    }

  }, [dice])


  function allNewDice(){
    const tenRandom = [];
    for(let i=0; i<10; i++){
      tenRandom.push(generateNewDie())
    }
    return tenRandom;
  }


  function rollDice(id){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }
        ))
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }

  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => 
      die.id === id ? 
      {...die, isHeld: !die.isHeld} : die
      ))
  }

  const individualDie = dice.map(die => {
    return <Die
           value={die.value} 
           key={die.id}
           isHeld={die.isHeld}
           handleClick={() =>holdDice(die.id)}
           />
  })

  return (
    <main className='main'>
      {tenzies && <Confetti />}
      <div className='tenzies-box'>
        <div className='tenzies-screen'>
          <div className='tenzies-grid'>
            {individualDie}
          </div>
          <button onClick={rollDice}>{tenzies ? "New Game" : "Roll!"}</button>
        </div>
      </div>
    </main>
  );
}

export default App;
