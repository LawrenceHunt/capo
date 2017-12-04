import React from 'react'
import randomID from 'random-id'

export default class Onboarding extends React.Component {

  createTeam(e) {
    e.preventDefault()
    const team = {
      id: randomID(10),
      name: this.name.value,
      players: [this.props.uid],
      captains: [this.props.uid]
    }
    this.props.createTeam(team);
    this.createTeamForm.reset();
  }

  render() {
    return (
      <div>
        <h1>Name your team:</h1>
        <form
          ref={(input) => this.createTeamForm = input}
          className="create-team"
          onSubmit={(e) => this.createTeam(e)}
        >
          <input ref={(input) => this.name = input} type="text" placeholder="Team Name" />
        </form>
      </div>
    )
  }
}
