import React from 'react';

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        isOn: false,
        isPaused: false,
        minutes: 0,
        seconds: 0,
        rounds: 0,
        rest: 0,
        counter: 0,
        roundsLeft: 0,
        restStartTime: 0,
        workStartTime: 0,
        workTime: 0,
        restTime: 0,
        timeLeft: 0,
      }

      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.pauseTimer = this.pauseTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
      this.display = this.display.bind(this)
    }
    
    startTimer = () => {

      if (this.state.isPaused) {
        this.setState({
          isPaused: false,
          isOn: true,
        })
        this.timer = setInterval(() => this.run(), 1);
      }

      else if (!this.state.isOn) {
        
        if (this.state.roundsLeft < 0) {
            this.setState({
              roundsLeft: 0,
            })
        }
        if (this.state.rest === 0) {
               this.setState({
                isOn: true,
                workStartTime: Date.now(),
                counter: this.state.counter + 1, 
                roundsLeft: this.state.rounds - (this.state.counter),
              }) 
        }
        if (this.state.rest > 0) {
                this.setState({
                isOn: true,
                workStartTime: Date.now(),
                counter: this.state.counter + 1, 
                roundsLeft: this.state.rounds - (this.state.counter + 1),
              })
          }
          if (this.state.counter > this.state.rounds) {
                this.setState({
              counter: this.state.rounds,
            })
          }
        this.timer = setInterval(() => this.run(), 1);
      }
  }


    convert = () => {
      let startMilliseconds = this.state.minutes*60*1000 + this.state.seconds*1000;
      let restMilliseconds = this.state.rest*1000;
      this.setState({
        workTime: startMilliseconds,
        restTime: restMilliseconds,
      })
    }

    run = () => {    
      const diff = Date.now() - this.state.workStartTime;
      this.convert();
      let remaining = this.state.workTime - diff;
      if (remaining < 0) {
        remaining = 0;
      }
      if (remaining === 0 && this.state.roundsLeft > 0) {
        clearInterval(this.timer)
        this.setState(() => ({
          isOn: false,
        }));
        this.startRest();
      }
      if (remaining === 0 && this.state.roundsLeft <= 0) {
        clearInterval(this.timer)
        this.setState(() => ({
          isOn: false,
        }));
      } else {
          this.setState(() => ({
            timeLeft: remaining, 
          }));  
      }
    }

    startRest = () => {
      if (this.state.restTime === 0) {
      this.startTimer();
      }
      else {
      this.setState(() => ({
        restStartTime: Date.now(), 
        isOn: true,
      }));
      this.restTimer = setInterval(() => {
      const difference = Date.now() - this.state.restStartTime;
      this.convert();
      let remaining = this.state.restTime - difference;
      if (remaining < 0) {
        remaining = 0;
      }
      if (remaining === 0) {
        clearInterval(this.restTimer)
        this.setState(() => ({
          isOn: false, 
        }));
      this.startTimer();
      }
      this.setState(() => ({
        timeLeft: remaining, 
          }));
        }, 1);
      } 
    }

    pauseTimer = () => {
      clearInterval(this.restTimer)
      clearInterval(this.timer)
      this.setState(() => ({
        isOn: false,
        isPaused: true,
        // workTime: Date.now() - this.state.workStartTime,
          }));
    }

    stopTimer = () => {
      this.setState({
        isOn: false,
        counter: 0,
      })
      clearInterval(this.timer)
      clearInterval(this.restTimer)
    }

    resetTimer = () => {
      this.setState({
        timeLeft: this.state.workTime, 
        isOn: false,
        counter: 0,
      })
      clearInterval(this.timer)
    }

    inputHandler = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    display = () => {
      let ms = this.state.timeLeft;
      ms = 1000*Math.round(ms/1000);
      var d = new Date(ms);
      return (
        ( ('0'+d.getUTCMinutes()).slice(-2) + ':' + ('0'+d.getUTCSeconds()).slice(-2) )
        )
      }   
    
    render() { 
        return (
        <div>
            <h3>Minutes</h3>
            <input type="number"  placeholder="00"   name="minutes"  onChange={this.inputHandler} />
            <h3>Seconds</h3>
            <input type="number"  placeholder="00"  name="seconds"  onChange={this.inputHandler} />
            <h3>Rounds</h3>
            <input type="number"  placeholder="00"  name="rounds"  onChange={this.inputHandler} />
            <h3>Rest</h3>
            <input type="number"  placeholder="00"  name="rest"  onChange={this.inputHandler} />
          <h2>TIME LEFT:</h2>
        <h2>Round {this.state.counter} of {this.state.rounds}</h2>
          <h3>{this.display()}</h3>
            <button onClick={this.startTimer}>start</button>
            <button onClick={this.pauseTimer}>pause</button> 
            <button onClick={this.stopTimer}>stop</button>
            <button onClick={this.resetTimer}>reset</button>
        </div>
      )
    }
  }
export default Timer;