import React from 'react';

class Team extends React.Component {

  generateCards () {
    return (
      <div className="team-grid">
        <div className="player-card">
          <div className="content">
            <div className="front">
              Lozzzza
              <div><img className="avatar" src="http://gallery.rxmuscle.com/newgallery/DSC_5240_SXGJOXLGXL.jpg" /></div>
            </div>
            <div className="back">
              Stats
              {/* <ul>
                <li>Games Played: </li>
                <li>Games Played: </li>
                <li>Games Played: </li>
                <li>Games Played: </li>
              </ul> */}
            </div>
          </div>
        </div>
        <div className="player-card">
          <div className="content">
            <div className="front">
              AdBalls
            </div>
            <div className="back">
              Stats
            </div>
          </div>
        </div>
        <div className="player-card">
          <div className="content">
            <div className="front">
              Jezza
            </div>
            <div className="back">
              Stats
            </div>
          </div>
        </div>
        <div className="player-card">
          <div className="content">
            <div className="front">
              Greek
            </div>
            <div className="back">
              Stats
            </div>
          </div>
        </div>
        <div className="player-card">
          <div className="content">
            <div className="front">
              PooFace
            </div>
            <div className="back">
              Stats
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
        <div className="team">
          {this.generateCards()}
        </div>
    )
  }
}

export default Team
