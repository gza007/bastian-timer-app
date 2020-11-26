import React from 'react';

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        minutes: 0,
        seconds: 0,
        rounds: 0,
        counter: 0,
        roundsLeft: 0,
        isOn: false,
        startTime: 0,
        overallTime: 0,
        timeLeft: 0,
      }
      this.startTimer = this.startTimer.bind(this)
      this.resumeTimer = this.resumeTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }
    
    startTimer = () => {
      if (!this.state.isOn) {
        this.setState({
          isOn: true,
          startTime: Date.now(),
          counter: this.state.counter + 1,
          roundsLeft: (this.state.rounds - 1) - this.state.counter,
        })
        this.timer = setInterval(() => this.run(), 1);
    }
  }


    convert = () => {
      let milliseconds = this.state.minutes*60*1000 + this.state.seconds*1000;
      this.setState({
        overallTime: milliseconds
      })
    }

    run = () => {    
      const diff = Date.now() - this.state.startTime;
      this.convert();
      let remaining = this.state.overallTime - diff;
      // let restRemaining = 5000 - diff;
      if (remaining < 0) {
        remaining = 0;
      }
      this.setState(() => ({
        timeLeft: remaining, 
      }));
      // if (remaining === 0 && this.state.rounds > 0) {
      //   clearInterval(this.timer)
      // }  
      // // this.setState(() => ({
      //   timeLeft: restRemaining, 
      // }));
      if (remaining === 0 && this.state.counter <= this.state.rounds) {
        clearInterval(this.timer)
        this.setState(() => ({
          isOn: false, 
        }));
        this.startTimer();
      }
      if (remaining === 0 && this.state.counter > this.state.rounds) {
        clearInterval(this.timer)
        this.setState(() => ({
          isOn: false, 
        }));
      }
    }

    resumeTimer = () => {

    }

    stopTimer = () => {
      this.setState({
        isOn: false
      })
      clearInterval(this.timer)
    }

    resetTimer = () => {
      this.setState({
        timeLeft: this.state.overallTime, 
        isOn: false
      })
      clearInterval(this.timer)
    }

    inputHandler = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    
    render() { 
      const Display = () => {
        let ms = this.state.timeLeft;
        ms = 1000*Math.round(ms/1000);
        var d = new Date(ms);
        return (
          ( ('0'+d.getUTCMinutes()).slice(-2) + ':' + ('0'+d.getUTCSeconds()).slice(-2) )
          )
        }   

        return(
        <div>
            <h3>Minutes</h3>
            <input type="number"  placeholder="00"   name="minutes"  onChange={this.inputHandler} />
            <h3>Seconds</h3>
            <input type="number"  placeholder="00"  name="seconds"  onChange={this.inputHandler} />
            <h3>Rounds</h3>
            <input type="number"  placeholder="00"  name="rounds"  onChange={this.inputHandler} />
          <h2>TIME LEFT:</h2><h3>{Display()}</h3>  
            <button onClick={this.startTimer}>start</button>
            <button onClick={this.resumeTimer}>resume</button> 
            <button onClick={this.stopTimer}>stop</button>
            <button onClick={this.resetTimer}>reset</button>
        </div>
      )
    }
  }
export default Timer;