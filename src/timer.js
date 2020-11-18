import React from 'react';

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        time: 60000,
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
        start: this.state.time - Date.now()
      })
      this.timer = setInterval(() => this.setState({
        time: this.state.start - Date.now()
      }), 1);
    }
    stopTimer() {
      this.setState({isOn: false})
      clearInterval(this.timer)
    }
    resetTimer() {
      this.setState({time: 0, isOn: false})
      clearInterval(this.timer)
    }

    // handleSubmit(event) {
    //   this.setState({title: event.target.value})
    // }

    render() { 
      const Display = () => {
        let ms = this.state.time;
        ms = 1000*Math.round(ms/1000);
        var d = new Date(ms);
        return (
          ( ('0'+d.getUTCMinutes()).slice(-2) + ':' + ('0'+d.getUTCSeconds()).slice(-2) )
          )
        }   
        
        console.log(Date.now())

        return(
        <div>
          <form onSubmit={this.handleSubmit}>
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