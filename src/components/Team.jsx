import React from 'react';
import FontAwesome from 'react-fontawesome'

class Team extends React.Component {

  generateCards () {
    return (
      <div className="team-grid">
        <div className="player-card">
          <div className="content">
            <div className="front">
              Lozza
              <div><img alt="Lozza" className="avatar" src="http://gallery.rxmuscle.com/newgallery/DSC_5240_SXGJOXLGXL.jpg" /></div>
            </div>
            <div className="back">
              Stats
              <ul className="stats">
                <li>Games Played: 10</li>
                <li>PoM Awards: 3</li>
                <li>Goals Scored: 55</li>
                <li>Assists Made: 20</li>
              </ul>
              <FontAwesome className="mvp" name="star" />
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
