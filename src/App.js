import React, {Component} from 'react';
import Pomodoro from './Pomodoro-clock.js';
import Play from './play.svg';
import Pause from './pause.svg';
import Laptop from './laptop.svg';
import Coffee from './coffee.svg';
import './App.css';

class App extends Component {
  state = {
    session: 25,
    break: 5,
    isPaused: true,
    type: 'session',
    current: 0  
  }

  timer = (seconds) => {
      
      let now = new Date().getTime();
      let then = now + (seconds * 1000);
      this.displayTimer(seconds);

      this.countdownID = setInterval(() => {
        const secondsLeft = Math.round((then - new Date().getTime()) / 1000);

        if (secondsLeft === 0){
          clearInterval(this.countdownID);
          document.getElementById('time-left').innerHTML = `00:00`;
          const type = this.state.type === 'session' ? 'break' : 'session';
          document.getElementById('beep').play();

          this.setState({
            type: type,
            current: 0
          });
          let typeID = setTimeout( () => {
            this.startTimer();  
            }, 1000);
        }
        this.displayTimer(secondsLeft);
      }, 1000);

  };

  displayTimer = (seconds) => {
    let secondsLeft = seconds;
    let minutes = Math.floor(seconds / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    document.getElementById('time-left').innerHTML = `${minutes}:${seconds}`;
    this.setState({ 
      current: secondsLeft,
    })
  };

  startTimer = () => {
    let timer;
    console.log("countdown begun")  
    if (this.state.isPaused !== true || this.state.current === 0) {
      if (this.state.type === "session") {
        timer = this.state.session;  
        document.getElementById('timer-label').innerHTML = 'session';
        document.getElementById('timer-img').setAttribute("src", `${Laptop}`)
      } else {
        timer = this.state.break;
        document.getElementById('timer-label').innerHTML = 'break';
        document.getElementById('timer-img').setAttribute("src", `${Coffee}`)
      }
    } else {
      timer = this.state.current / 60;
    }

  let seconds = (timer * 60); /*this is what matters for when pausing, have to get stored data to pass in */
    this.timer(seconds);
  }

  stopTimer = () => {
    clearInterval(this.countdownID); 
  }


  pause = () => {
    let isPaused = this.state.isPaused;
    if (isPaused) {
      document.getElementById("start_stop").setAttribute("src", `${Pause}`)
      this.startTimer();
      this.setState({
        isPaused: !isPaused
      })
    } else {
      document.getElementById("start_stop").setAttribute("src", `${Play}`)
      this.stopTimer();
      this.setState({
        isPaused: !isPaused,
      })
    }
  };

 increment = e => {
  let value = e.target.value;
  let isPaused = this.state.isPaused;
  let num;
  let session = this.state.session;


  if (isPaused) {
    if (value === 'session-increment') {
      num = session < 60 ? session + 1 : session;
      document.getElementById('time-left').innerHTML = `${num < 10 ? '0' : ''}${num}:00`;
      this.setState({
        session: num, 
        current: 0
      })
    } else {
      num = this.state.break < 60 ? this.state.break + 1 : this.state.break;
      document.getElementById('time-left').innerHTML = this.state.type === 'break' ? `${num < 10 ? '0' : ''}${num}:00`: `${session < 10 ? '0' : ''}${session}:00`;
      this.setState({
        break: num,
        current: 0
      })
    }
  }
 };

 decrement = e => {
  let value = e.target.value;
  let isPaused = this.state.isPaused;
  let num;
  let session = this.state.session;

  if (isPaused) {
    if (value === 'session-decrement') {
      num = session > 1 ? session - 1 : session;
      document.getElementById('time-left').innerHTML = `${num < 10 ? '0' : ''}${num}:00`;
      this.setState({
        session: num,
        current: 0
      })
    } else {
      num = this.state.break > 1 ? this.state.break - 1 : this.state.break;
      document.getElementById('time-left').innerHTML = this.state.type === 'break' ? `${num < 10 ? '0' : ''}${num}:00`: `${session < 10 ? '0' : ''}${session}:00`;
      this.setState({
        break: num,
        current: 0
      })
    }
  }
 };

 reset = e => {
  console.log("reset occurred");
  this.stopTimer();
  document.getElementById('timer-label').innerHTML = 'session';
  document.getElementById("start_stop").setAttribute("src", `${Play}`);
  let beep = document.getElementById('beep');
  beep.pause();
  beep.currentTime = 0;
  document.getElementById('time-left').innerHTML = '25:00';
  this.setState({
    session: 25,
    break: 5,
    isPaused: true,
    type: 'session',
    current: 0
  });
}

  render() {
   return  (
    <div className="App">
      <header className="App-header">
        <Pomodoro 
          session={this.state.session}
          break={this.state.break}
          reset={this.reset}
          increment={this.increment}
          decrement={this.decrement}
          pause={this.pause}
          seconds={this.state.current}
        />
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
}

export default App;
