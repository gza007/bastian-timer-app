import React from 'react';

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        time: 0,
        isOn: false,
        start: 0
      }
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }
    
    
    startTimer() {
      this.setState({
        isOn: true,
        time: this.state.time,
        start: Date.now() - this.state.time
      })
      this.timer = setInterval(() => this.setState({
        time: Date.now() - this.state.start
      }), 1);
    }
    stopTimer() {
      this.setState({isOn: false})
      clearInterval(this.timer)
    }
    resetTimer() {
      this.setState({time: 0, isOn: false})
    }
    render() {
      let start = (this.state.time === 0) ?
        <button onClick={this.startTimer}>start</button> :
        null
      let stop = (this.state.time === 0 || !this.state.isOn) ?
        null :
        <button onClick={this.stopTimer}>stop</button>
      let resume = (this.state.time === 0 || this.state.isOn) ?
        null :
        <button onClick={this.startTimer}>resume</button>
      let reset = (this.state.time === 0 || this.state.isOn) ?
        null :
        <button onClick={this.resetTimer}>reset</button>

        const Display = () => {
            let ms = this.state.time;
            ms = 1000*Math.round(ms/1000);
            var d = new Date(ms);
            return (
                ( ('0'+d.getUTCMinutes()).slice(-2) + ':' + ('0'+d.getUTCSeconds()).slice(-2) )
                )
            }   
        
      return(
        <div>
          <h3>timer: {Display()}</h3>
          {start}
          {resume}
          {stop}
          {reset}
        </div>
      )
    }
  }
export default Timer;