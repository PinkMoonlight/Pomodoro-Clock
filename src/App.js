import React, {Component} from 'react';
import Pomodoro from './Pomodora-clock.js';
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
    current: null
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  countdown = (end) => {

      let now = new Date().getTime();
      let distance = end - now;
      let minutes = Math.floor(distance / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60) / 1000));
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      document.getElementById('time-left').innerHTML = `${minutes}:${seconds}`;
      this.setState({ 
        current: `${minutes}:${seconds}`,
      })

      if (distance <= 0) {
        if (this.state.type === 'session') {
          this.setState({
          type: 'break'
        })
      } else if (this.state.type === 'break') {
        this.setState({
          type: 'session'
        })
      } else 
        document.getElementById('time-left').innerHTML = `00:00`;
        this.stopTimer();
      } 
  };

  startTimer = () => {
    let timer;
    console.log("countdown begun")  
    if (this.state.type === "session") {
      timer = this.state.session;  
      document.getElementById('timer-label').innerHTML = 'session';
      document.getElementById('timer-img').setAttribute("src", `${Laptop}`)
    } else {
      timer = this.state.break;
      document.getElementById('timer-label').innerHTML = 'break';
      document.getElementById('timer-img').setAttribute("src", `${Coffee}`)
    }
    let end = new Date().getTime() + (timer * 60 * 1000);
    this.timerID = setInterval(this.countdown, 1000, end);
  }

  stopTimer = () => {
    clearInterval(this.timerID);
    
  }


  pause = () => {
    let isPaused = this.state.isPaused;
    if (isPaused) {
      document.getElementById("img-play").setAttribute("src", `${Pause}`)
      this.startTimer();
      this.setState({
        isPaused: !isPaused
      })
    } else {
      document.getElementById("img-play").setAttribute("src", `${Play}`)
      this.stopTimer();
      this.setState({
        isPaused: !isPaused,
      })
    }


  };

 increment = e => {
  let value = e.target.value;
  console.log(e.target.value);
  let num;

  if (value === 'session-increment') {
    num = this.state.session < 60 ? this.state.session + 1 : this.state.session;
    document.getElementById('time-left').innerHTML = `${num}:00`;
    this.setState({
      session: num
    })
  } else {
    num = this.state.break <60 ? this.state.break + 1 : this.state.break;
    document.getElementById('time-left').innerHTML = this.state.type === 'break' ? `${num}:00`: `${this.state.session}:00`;
    this.setState({
      break: num
    })
  }
 }

 decrement = e => {
  let value = e.target.value;
  console.log(e.target.value);
  let num;

  if (value === 'session-decrement') {
    num = this.state.session >1 ? this.state.session - 1 : this.state.session;
    document.getElementById('time-left').innerHTML = `${num}:00`;
    this.setState({
      session: num
    })
  } else {
    num = this.state.break >1 ? this.state.break - 1 : this.state.break;
    document.getElementById('time-left').innerHTML = this.state.type === 'break' ? `${num}:00`: `${this.state.session}:00`;
    this.setState({
      break: num
    })
  }
 }

  reset = e => {
    console.log("reset occurred")
    document.getElementById("img-play").setAttribute("src", `${Play}`);
    this.stopTimer();
    document.getElementById('time-left').innerHTML = `25:00`;
    this.setState({
      session: 25,
      break: 5,
      isPaused: true,
      type: 'session',
      current: null
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
