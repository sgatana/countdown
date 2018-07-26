import React, { Component } from 'react'
import moment from 'moment'
import Timer from './Timer'
import { Controls } from './Controls'

export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: this.getRemainingTime(),
      paused: false
    }
  }
  componentDidMount() {
    this.resume()
  }
  componentWillUnmount() {
    this.paused()
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
      if (paused) {
      this.paused()
      } else {
        this.resume()
      }
      return {
        paused
      }
    })
  }
  paused(){
    clearInterval(this.interval)
  }
  resume() {
    this.interval = setInterval(() => {
      this.setState({
        duration: this.getRemainingTime()
      })
    }, 1000)
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
            <Timer duration ={duration} />
            <Controls paused={paused} onTogglePaused={this.handleTogglePaused} />
          </div>
        </div>
      </section>
    )
  }
}



