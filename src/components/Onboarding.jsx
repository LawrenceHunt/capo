import React from 'react'
import randomID from 'random-id'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

export default class Onboarding extends React.Component {

  constructor() {
    super();

    this.state = {
      id: randomID(10),
      step: 1,
      isUploading: false,
      progress: null,
      inputs: ['Captain', 'Player 2', 'Player 3', 'Player 4', 'Player 5']
    }

    this.previousStep = this.previousStep.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress: 0
    })
  }

  handleProgress = (progress) => {
    this.setState({progress})
  }

  handleUploadError = (error) => {
    this.setState({isUploading: false})
    console.error(error)
  }

  handleUploadSuccess = (filename) => {
    this.badge = filename
    this.setState({
      progress: 100,
      isUploading: false,
      badgeUrl: ''
    })
    firebase.storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({badgeURL: url}))
  }

  nextStep(e) {
    e.preventDefault()
    if (this.formInput) {
      this.team_name = this.formInput.value
      this.player_ids = [this.props.uid]
      this.captains_ids = [this.props.uid]
    }
    this.setState({step: this.state.step + 1})
  }

  addPlayer() {
    const newPlayer = `Player ${this.state.inputs.length + 1}`
    this.setState({ inputs: this.state.inputs.concat([newPlayer])})
  }

  finaliseSquad(e) {
    const nameInputs = Array.from(document.getElementsByClassName('player'))
    const emailInputs = Array.from(document.getElementsByClassName('player-email'))
    this.player_names = []
    this.player_emails = []
    this.captains_names = []
    this.captains_names.push(nameInputs[0].value)
    nameInputs.forEach((input) => {
        if (input.value !== '') this.player_names.push(input.value)
    });
    emailInputs.forEach((input) => {
        if (input.value !== '') this.player_emails.push(input.value)
    });
    this.setState({step: this.state.step + 1})
  }

  previousStep() {
    this.setState({step: this.state.step - 1})
  }

  uploadToFirebase(e) {
    e.preventDefault()
    const teamObj = {
      id: this.state.id,
      team_name: this.team_name,
      player_names: this.player_names,
      player_ids: this.player_ids,
      player_emails: this.player_emails,
      captains_ids: this.captains_ids,
      captains_names: this.captains_names,
      badge: this.badge
    }
    console.log('Submitting')
    this.props.createTeam(teamObj)
  }

  render() {

    const teamName = (
      <div>
        <label>Name Your Team</label>
        <form
          className="team-name"
          onSubmit={(e) => this.nextStep(e)}
        >
          <input type="text" ref={(input) => this.formInput = input} placeholder="Team Name" />
          <input type="button" value="Next" onClick={(e) => this.nextStep(e)} />
        </form>
      </div>
    )

    const teamBadge = (
      <div>
        <form>
          <label>Badge for {this.team_name}:</label>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }
          {this.state.badgeURL &&
            <img src={this.state.badgeURL} alt={`${this.state.badgeUrl}`}/>
          }
          <FileUploader
            accept="image/*"
            name="badge"
            filename={this.state.id}
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            maxHeight={200}
            maxWidth={200}
          />
          <input type="button" value="Previous" onClick={this.previousStep} />
          <input type="button" value="Next" onClick={(e) => this.nextStep(e)} />
        </form>
      </div>
    )

    const teamPlayers = (
      <div>
        <h2 className="squad-header">Pick your squad (make sure to include yourself!)</h2>
        <form>
          <div className="pick-squad">
            <div className="player-names">
              {this.state.inputs.map(input => <input type="text" className="player" key={input} placeholder={input} />)}
            </div>
            <div className="player-emails">
              {this.state.inputs.map(input => <input type="text" className="player-email" key={input + ' Email'} placeholder={input + ' Email'} />)}
            </div>
          </div>
          <div className="onboarding-buttons">
            <input type="button" value="Add More Players" onClick={this.addPlayer} />
            <input type="button" value="Finalise Squad" onClick={(e) => this.finaliseSquad(e)} />
          </div>
        </form>
      </div>
    )

    const confirmation = (
      <div className="confirmation">
        {/* Show team name, captain, badge and players */}
        <h2>Your Team Name:</h2>
        <div>{this.team_name}</div>
        <h2>Your Team Badge:</h2>
        <img src={this.state.badgeURL} />
        <h2>Your Team Captain:</h2>
        <div>{this.player_names ? this.player_names[0] : 'You need to add a captain!'}</div>
        <h2>Your Squad:</h2>
        <div>{this.player_names ? this.player_names.map((player) => <div key={player}>{player}</div>) : 'You need to add your players!'}</div>
        <button className="uploadTeam" onClick={(e) => this.uploadToFirebase(e)}>Submit My Team</button>
      </div>

    )

    const createTeamViews = {
      1: teamName,
      2: teamBadge,
      3: teamPlayers,
      4: confirmation
    }

    return createTeamViews[this.state.step]
  }
}
