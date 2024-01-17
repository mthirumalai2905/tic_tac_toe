import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const titleRef = useRef(null);

  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }

    const newData = [...data];
    newData[num] = count % 2 === 0 ? 'x' : 'o';
    setCount(count + 1);
    checkWin(newData);
    setData(newData);
  };

  const checkWin = (currentData) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
        won(currentData[a]);
        return;
      }
    }

    if (count === 9) {
      // If all cells are filled and no winner, it's a tie
      setLock(true);
      titleRef.current.innerHTML = "It's a tie!";
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `<div class="winner-text"><img src=${cross_icon} alt="cross" /> wins!</div>`;
    } else if (winner === "o") {
      titleRef.current.innerHTML = `<div class="winner-text"><img src=${circle_icon} alt="circle" /> wins!</div>`;
    }
  };
  

  const resetGame = () => {
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
    setData(["", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className='board'>
        <div className='row1'>
          {[0, 1, 2].map((num) => (
            <div
              key={num}
              id={`box-${num}`}
              className='boxes'
              onClick={() => toggle(num)}
            >
              {data[num] === 'x' && <img src={cross_icon} alt='cross' />}
              {data[num] === 'o' && <img src={circle_icon} alt='circle' />}
            </div>
          ))}
        </div>
        <div className='row2'>
          {[3, 4, 5].map((num) => (
            <div
              key={num}
              id={`box-${num}`}
              className='boxes'
              onClick={() => toggle(num)}
            >
              {data[num] === 'x' && <img src={cross_icon} alt='cross' />}
              {data[num] === 'o' && <img src={circle_icon} alt='circle' />}
            </div>
          ))}
        </div>
        <div className='row3'>
          {[6, 7, 8].map((num) => (
            <div
              key={num}
              id={`box-${num}`}
              className='boxes'
              onClick={() => toggle(num)}
            >
              {data[num] === 'x' && <img src={cross_icon} alt='cross' />}
              {data[num] === 'o' && <img src={circle_icon} alt='circle' />}
            </div>
          ))}
        </div>
      </div>
      <button className='reset' onClick={resetGame}>
        reset
      </button>
    </div>
  );
};

export default TicTacToe;
