import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
window.moment = moment
export default class FixtureForm extends React.Component {

  constructor() {
    super()
    this.state = {
      date: moment(+new Date()),
      vs: ""
    }
  }

  handleDateChange(date) {
    this.setState({date: date.unix()})
  }

  handleVsChange(e) {
    this.setState({vs: e.target.value})
  }

  handleSubmit() {
    const fixtureObj = {
      date: this.state.date,
      vs: this.state.vs
    }
    this.props.createFixture(fixtureObj)
    this.props.hideFixtureForm()
  }


  render() {

    // const dateFormat = ("MMMM Do YYYY")
    // const timeFormat = ("h:mm:ss a")

    return (
      <div className="fixture-form">
        <h1>Create a new fixture for:</h1>

        <h2>Date:</h2>
        <DatePicker
          selected={moment(this.state.date)}
          onChange={(date) => this.handleDateChange(date)}
          showTimeSelect
          dateFormat="LLL"
        />

        <h2>Vs:</h2>
        <input
          type="text"
          name="vs"
          onChange={(e) => this.handleVsChange(e) }
        ></input>

        <button
          className="btn-large btn-outline"
          onClick={() => this.handleSubmit()}
        >Save</button>

      </div>
    )
  }



}
