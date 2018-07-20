import React, { Component } from 'react';
import moment from 'moment'
import { Controls } from './controls'


class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: this.getRemainingTime(),
      paused: false
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        duration: this.getRemainingTime()
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  getRemainingTime = () => {
    let now = moment(),
      newYear = moment({ year: now.year() + 1 }),
      diff = newYear.diff(now)

    return moment.duration(diff)
  }
  handleTogglePaused = () => {
    this.setState((prevState, props) => {
      const paused = !prevState.paused
      if(paused){
        clearInterval(this.interval)
      } else {
        this.interval = setInterval(() => {
          this.setState({
            duration: this.getRemainingTime()
          })
        }, 1000)
      }
      return {
        paused
      }
    })
  }
  render() {
    const { duration, paused } = this.state
    return (
      <section className="hero is-light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h2 className="subtitle has-text-centered">
              Remaining time to new year
          </h2>
            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Days</p>
                  <p className="title">{Math.floor(duration.asDays())}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Hours</p>
                  <p className="title">{duration.hours().toString().padStart(2, '0')}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Min</p>
                  <p className="title">{duration.minutes().toString().padStart(2, '0')}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Sec</p>
                  <p className="title">{duration.seconds().toString().padStart(2, '0')}</p>
                </div>
              </div>
            </nav>
            <Controls paused={paused} onTogglePaused={this.handleTogglePaused} />
          </div>
        </div>
      </section>
    );
  }
}

export default CountDown;
