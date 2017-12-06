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
      inputs: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']
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
      this.name = this.formInput.value
      this.player_ids = [this.props.uid]
      this.captains = [this.props.uid]
    }
    this.setState({step: this.state.step + 1})
  }

  addPlayer() {
    const newPlayer = `Player ${this.state.inputs.length + 1}`
    this.setState({ inputs: this.state.inputs.concat([newPlayer])})
  }

  finaliseSquad(e) {
    const inputs = Array.from(document.getElementsByClassName('player'))
    this.player_names = [];
    inputs.forEach((input) => {
        if (input.value !== '') this.player_names.push(input.value);
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
      team_name: this.name,
      player_names: this.players,
      player_ids: this.player_ids,
      captains: this.captains,
      badge: this.badge
    }
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
          <label>Badge for {this.name}:</label>
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
        <form className="pick-squad">
          <div className="player-names">
            {this.state.inputs.map(input => <input type="text" className="player" key={input} placeholder={input} />)}
          </div>
          <div className="player-emails">
            {this.state.inputs.map(input => <input type="text" className="player-email" key={input + ' Email'} placeholder={input + ' Email'} />)}
          </div>
          <input className="onboarding-button" type="button" value="Add More Players" onClick={this.addPlayer} />
          <input className="onboarding-button" type="button" value="Finalise Squad" onClick={(e) => this.finaliseSquad(e)} />
        </form>
      </div>
    )

    const createTeamViews = {
      1: teamName,
      2: teamBadge,
      3: teamPlayers
    }

    return createTeamViews[this.state.step]
  }
}
