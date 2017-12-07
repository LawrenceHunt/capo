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
    this.createTeam = this.createTeam.bind(this)
    this.joinTeam = this.joinTeam.bind(this)
  }

  joinTeam() {
    this.setState({ step: this.state.step + 1 })
  }

  createTeam() {
    this.setState({ step: this.state.step + 2 })
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

    const createOrJoin = (
      <div className="onboarding-container">
        <h2 className="onboarding-item">Create a new team or join an existing one</h2>
        <form>
          <div className="onboarding-item">
            <button className="btn-large btn-outline" onClick={this.createTeam}>Create Team</button>
          </div>
          <div className="onboarding-item">
            <button className="btn-large btn-outline" onClick={this.joinTeam}>Join Team</button>
          </div>
        </form>
      </div>
    )

    const findTeam = (
      <div className="onboarding-container">
        <div className="onboarding-item">
          I'm gonna find a team for you!
        </div>
      </div>
    )

    const teamName = (
      <div className="onboarding-container">
        <label className="onboarding-item">Name Your Team</label>
        <form
          className="onboarding-item"
          onSubmit={(e) => this.nextStep(e)}
        >
          <input type="text" className="onboarding-input" ref={(input) => this.formInput = input} placeholder="Team Name" required />
          <button type="submit" className="btn-large btn-outline" onSubmit={(e) => this.nextStep(e)}>Next</button>
        </form>
      </div>
    )

    const teamBadge = (
      <div>
        <form className="onboarding-container">
          <div className="onboarding-item">
            <label>Please upload your badge for <span>{this.team_name}</span> : </label>
          </div>
          <div className="onboarding-item badge-uploader">
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
          </div>
          <div className="onboarding-item">
            <button className="btn-large btn-outline" onClick={(e) => this.previousStep(e)}>Previous</button>
            <button type="submit" className="btn-large btn-outline" onClick={(e) => this.nextStep(e)}>Next</button>
          </div>
        </form>
      </div>
    )

    const teamPlayers = (
      <div className="onboarding-container">
        <h2 className="onboarding-item">Pick your squad (make sure to include yourself!)</h2>
        <form>
          <div className="onboarding-item">
            {this.state.inputs.map(input =>
              <div>
                <input type="text" className="onboarding-input player" key={input} placeholder={input} />
                <input type="text" className="onboarding-input player-email" key={input + ' Email'} placeholder={input + ' Email'} />
              </div>
            )}
          </div>
          <div className="onboarding-item">
            <button className="btn-large btn-outline" onClick={this.addPlayer}>Add More Players</button>
            <button className="btn-large btn-outline" onClick={(e) => this.finaliseSquad(e)}>Finalise Squad</button>
          </div>
        </form>
      </div>
    )

    const confirmation = (
      <div className="onboarding-container">
        <div className="onboarding-item">
          <h2>Your Team Name:</h2>
          <div>{this.team_name}</div>
        </div>
        <div className="onboarding-item">
          <h2>Your Team Badge:</h2>
          <img src={this.state.badgeURL} alt="team badge" />
        </div>
        <div className="onboarding-item">
          <h2>Your Team Captain:</h2>
          <div>{this.player_names ? this.player_names[0] : 'You need to add a captain!'}</div>
        </div>
        <div className="onboarding-item">
          <h2>Your Squad:</h2>
          <div>{this.player_names ? this.player_names.map((player) => <div key={player}>{player}</div>) : 'You need to add your players!'}</div>
        </div>
        <div className="onboarding-item">
          <button className="btn-large btn-outline" onClick={(e) => this.uploadToFirebase(e)}>Submit My Team</button>
        </div>
      </div>

    )

    const createTeamViews = {
      1: createOrJoin,
      2: findTeam,
      3: teamName,
      4: teamBadge,
      5: teamPlayers,
      6: confirmation
    }

    return createTeamViews[this.state.step]
  }
}
