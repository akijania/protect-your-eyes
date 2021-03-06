import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: 20,
      timer: 'null',
    };
  }

  formatTime = (secs) => {
    let minutes = ('0' + Math.floor(secs / 60)).slice(-2);
    secs = ('0' + (secs % 60)).slice(-2);
    return `${minutes}:${secs}`;
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  step = () => {
    const { time, status } = this.state;
    if (time > 0) {
      this.setState({
        time: time - 1,
      });
    } else {
      this.playBell();
      if (status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
      } else {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    const { timer } = this.state;
    this.setState({
      status: 'off',
      time: 0,
      timer: clearInterval(timer),
    });
  };

  closeApp = () => {
    window.close();
  };

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {status === 'work' && <img src='./images/work.png' />}
        {status === 'rest' && <img src='./images/rest.png' />}
        {status !== 'off' && (
          <div className='timer'>{this.formatTime(time)}</div>
        )}
        {status === 'off' ? (
          <button className='btn' onClick={() => this.startTimer()}>
            Start
          </button>
        ) : (
          <button className='btn' onClick={() => this.stopTimer()}>
            Stop
          </button>
        )}
        <button className='btn btn-close' onClick={() => this.closeApp()}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
