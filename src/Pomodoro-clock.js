import React from 'react';
import Play from './play.svg';
import Laptop from './laptop.svg';
import Loop from './loop.svg';
import beep from './beep.mp3';



let Pomodoro = (props) => {

    let minutes = Math.floor(props.seconds / 60);
    let seconds = Math.floor(props.seconds % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    let timer = `${minutes}:${seconds}`;

    return (
        <div className="container">
        <h1 className="title">Pomodoro Clock</h1>
        <div className="timer-box">
          <div id="timer-label">session</div>
          <div id="time-left" value={timer}>25:00</div>
          <div>
          <img id="timer-img" src={Laptop} alt="laptop" />
          </div>
        </div>
        <div className="controls">
          <button className="start_stop">
            <img id="start_stop" src={Play} alt="play/pause Logo" onClick={props.pause}/>
          </button>
          <button className="reset" >
            <img id="reset" src={Loop} alt="reset arrow loop" onClick={props.reset}/>
          </button>
        </div>
        <section className="increments">
          <div className="increments-left">
            <h5 id="session-label">session length</h5>
            <button className="adjust" id="session-decrement" value="session-decrement" onClick={props.decrement}>-</button>
            <div id="session-length" value={props.session}>{props.session}</div>
            <button className="adjust" id="session-increment" value="session-increment" onClick={props.increment}>+</button>
          </div> 
          <div className="increments-right">
          <h5 id="break-label">break length</h5>
            <button className="adjust" id="break-decrement" value="break-decrement" onClick={props.decrement}>-</button>
            <div id="break-length" value={props.break}>{props.break}</div>
            <button className="adjust" id="break-increment" value="break-increment" onClick={props.increment}>+</button>
          </div> 
        </section>
        <audio id="beep" src={beep}></audio>
      </div>

    )
}

export default Pomodoro