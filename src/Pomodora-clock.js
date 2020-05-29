import React from 'react';
import Play from './play.svg';
import Laptop from './laptop.svg';
import {ReactComponent as LoopLogo} from './loop.svg';



let Pomodoro = (props) => {

    return (
        <div className="container">
        <h1 className="title">Pomodoro Clock</h1>
        <div className="timer-box">
          <div id="timer-label">session</div>
          <div id="time-left">25:00</div>
          <div>
          <img id="timer-img" src={Laptop} alt="laptop" />
          </div>
        </div>
        <div className="controls">
          <button id="start_stop">
            <img id="img-play" src={Play} alt="play/pause Logo" onClick={props.pause}/>
          </button>
          <button id="reset" onClick={props.reset}>
            <LoopLogo />
          </button>
        </div>
        <section className="increments">
          <div className="increments-left">
            <h5 id="session-label">session length</h5>
            <button className="adjust" id="session-decrement" value="session-decrement" onClick={props.decrement}>-</button>
            <div id="session-length">{props.session}</div>
            <button className="adjust" id="session-increment" value="session-increment" onClick={props.increment}>+</button>
          </div> 
          <div className="increments-right">
          <h5 id="break-label">break length</h5>
            <button className="adjust" id="break-decrement" value="break-decrement" onClick={props.decrement}>-</button>
            <div id="break-length">{props.break}</div>
            <button className="adjust" id="break-increment" value="break-increment" onClick={props.increment}>+</button>
          </div> 
        </section>
      </div>

    )
}

export default Pomodoro