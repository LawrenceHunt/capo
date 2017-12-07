import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'


export default class FixtureForm extends React.Component {

  constructor() {
    super()
    this.state = {
      date: moment(),
      vs: ""
    }
  }

  handleDateChange(date) {
    this.setState({date})
  }

  handleVsChange(e) {
    console.log(e)
    e.preventDefault()
    this.setState({vs: e.value})
  }

  handleSubmit() {
    const fixtureObj = {
      date: this.state.date.unix(),
      vs: this.state.vs
    }
    console.log(fixtureObj)
  }


  render() {

    const dateFormat = ("MMMM Do YYYY")
    const timeFormat = ("h:mm:ss a")

    return (
      <div className="fixture-form">
        <h1>Create a new fixture for:</h1>
        <span>
          Date:
          <DatePicker
            selected={this.state.date}
            onChange={(date) => this.handleDateChange(date)}
            showTimeSelect
            dateFormat="LLL"
          />
        </span>

      <span>
        Vs:
        <input
          type="text"
          name="vs"
          value={this.state.vs}
          onChange={(e) => this.handleVsChange(e) }
        ></input>
      </span>

        <button
          className="btn-large btn-outline"
          onClick={() => this.handleSubmit()}
        >Save</button>

      </div>
    )
  }



}
