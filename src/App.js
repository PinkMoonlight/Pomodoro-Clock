import React from 'react';
import {ReactComponent as PlayLogo} from './play.svg';
import {ReactComponent as LoopLogo} from './loop.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="title">Pomodoro Clock</h1>
          <div className="timer-box">
            <div id="timer-label"> Session / Break </div>
            <div id="time-left">00:00</div>
            <div> image?</div>
          </div>
          <div className="controls">
            <button id="start_stop">
              <PlayLogo />
            </button>
            <button id="rest">
              <LoopLogo />
            </button>
          </div>
          <section className="increments">
            <div className="increments-left">
              <h5 id="session-label">session length</h5>
              <button className="adjust" id="session-decrement">-</button>
              <div id="session-length">25</div>
              <button className="adjust"id="session-increment">+</button>
            </div> 
            <div className="increments-right">
            <h5 id="break-label">break length</h5>
              <button className="adjust"id="break-decrement">-</button>
              <div id="break-length">5</div>
              <button className="adjust"id="break-increment">+</button>
            </div> 
          </section>

        </div>
      </header>
      <footer>
          <p>
            Designed and coded by{" "}
            <a className="footer__name-link" href="http://www.katecherie.com">
              Kate Fisher
            </a>
          </p>
        </footer>
    </div>
  );
}

export default App;
