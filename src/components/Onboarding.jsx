import React from 'react'
import randomID from 'random-id'
import FontAwesome from 'react-fontawesome'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

export default class Onboarding extends React.Component {

  constructor() {
    super();

    this.state = {
      id: randomID(10),
      name: '',
      players: '',
      captains: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: '',
      step: 1
    }

    this.previousStep = this.previousStep.bind(this)
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  };

  nextStep(e) {
    e.preventDefault()
    if (this.formInput.value) {
      this.setState({ name: this.formInput.value, players: this.props.uid, captains: this.props.uid })
    }
    console.log(this.props.uid)
    this.setState({step: this.state.step + 1});
  }

  previousStep() {
    this.setState({step: this.state.step - 1});
  }

  uploadToFirebase(e) {
    e.preventDefault()
    console.log(this.state)
    // this.props.createTeam(this.state);
  }



  render() {
    switch (this.state.step) {
      case 1:
        return (
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
      case 2:
        return (
          <div>
            <form>
              <label>Team Badge:</label>
              {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
              }
              {this.state.avatarURL &&
                <img src={this.state.avatarURL} />
              }
              <FileUploader
                accept="image/*"
                name="avatar"
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
    }
  }
}
