import React from 'react';

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        isOn: false,
        startTime: 0,
        overallTime: 50000,
        timeLeft: 0,
      }
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }
     
    
    startTimer() {
      this.setState({
        isOn: true,
        startTime: Date.now()
      })
      this.timer = setInterval(() => this.run(), 10);
    }

    run() {
      const diff = Date.now() - this.state.startTime;
      let remaining = this.state.overallTime - diff;
      if (remaining < 0) {
        remaining = 0;
      }
      this.setState(() => ({
        timeLeft: remaining
      }));
      if (remaining === 0) {
        clearInterval(this.timer)
      }
    }

    stopTimer() {
      this.setState({isOn: false})
      clearInterval(this.timer)
    }
    resetTimer() {
      this.setState({startTime: 0, isOn: false})
      clearInterval(this.timer)
    }

    handleSubmit = (event) => {
      this.setState({startTime: event.target.value})
      console.log(event.target.value)
    }

    render() { 
      const Display = () => {
        let ms = this.state.timeLeft ;
        ms = 1000*Math.round(ms/1000);
        var d = new Date(ms);
        return (
          ( ('0'+d.getUTCMinutes()).slice(-2) + ':' + ('0'+d.getUTCSeconds()).slice(-2) )
          )
        }   

        return(
        <div>
          <form onChange={this.handleSubmit}>
            <input type="number"/>
          </form>
          <h3>{Display()}</h3>
            <button onClick={this.startTimer}>start</button> 
            <button onClick={this.stopTimer}>stop</button>
            <button onClick={this.resetTimer}>reset</button>
        </div>
      )
    }
  }
export default Timer;