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
      progress: null
    }

    this.previousStep = this.previousStep.bind(this)
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
    if (this.formInput.value) {
      this.name = this.formInput.value
      this.players = [this.props.uid]
      this.captains = [this.props.uid]
    }
    this.setState({step: this.state.step + 1})
  }

  previousStep() {
    this.setState({step: this.state.step - 1})
  }

  uploadToFirebase(e) {
    e.preventDefault()
    const teamObj = {
      id: this.state.id,
      name: this.name,
      players: this.players,
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
          ref={(input) => this.createTeamForm = input}
          className="create-team"
          onSubmit={(e) => this.nextStep(e)}
        >
          <input type="text" ref={(input) => this.formInput = input} placeholder="Team Name" />
          <input type="button" value="Next Step" onClick={(e) => this.nextStep(e)} />
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
            <img src={this.state.badgeURL} />
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
          <input type="button" value="Previous Step" onClick={this.previousStep} />
          <input type="button" value="Finish" onClick={(e) => this.uploadToFirebase(e)} />
        </form>
      </div>
    )

    const createTeamViews = {
      1: teamName,
      2: teamBadge
    }

    return createTeamViews[this.state.step]
  }
}
