import React from 'react';

class Team extends React.Component {
  render() {
    return (
      <div className="team">
        <div className="squad-list">
          <div className="player">Player One</div>
          <div className="player">Player Two</div>
          <div className="player">Player Three</div>
          <div className="player">Player Four</div>
          <div className="player">Player Five</div>
          <div className="player">Player Six</div>
          <div className="player">Player Seven</div>
          <div className="player">Player Eight</div>
          <div className="player">Player Nine</div>
          <div className="player">Player Ten</div>
          <div className="player">Player Eleven</div>
          <div className="player">Player Twelve</div>
          <div className="player">Player Thirteen</div>
          <div className="player">Player Fourteen</div>
          <div className="player">Player Fifteen</div>
        </div>
        <div className="bio">
          <header className="player-name">Lawrence Hunt</header>
          <div className="player-picture"><span>Image</span></div>
          <ul className="player-stats">
            <li>Games Played: TAKE IN GAME DATA</li>
            <li>Goals Scored: TAKE IN GAME DATA</li>
            <li>Assists Made: TAKE IN GAME DATA</li>
            <li>Man of Match Awards: TAKE IN GAME DATA</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Team
