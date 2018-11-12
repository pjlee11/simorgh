import React, { Fragment } from 'react';
import { func } from 'prop-types';
import nanoid from 'nanoid';

const getTeamName = team => team['team-metadata'].name.$.full;

const getTeamPoints = team =>
  team['team-stats']['outcome-totals'][0].$['standing-points'];

const getUndefeated = team =>
  `${team['team-stats']['outcome-totals'][0].$.losses === '0'}`;

const getGoalsScored = team =>
  team['team-stats']['outcome-totals'][0].$['points-scored-for'];

const getGoalsConceed = team =>
  team['team-stats']['outcome-totals'][0].$['points-scored-against'];

const getPosition = team => team['team-stats'].rank[0].$.value;

const getMatchesPlayed = team => team['team-stats'].$['events-played'];

const generateTeams = teams =>
  teams.map(team => (
    <tr>
      <td>{getTeamName(team)}</td>
      <td>{getPosition(team)}</td>
      <td>{getTeamPoints(team)}</td>
      <td>{getMatchesPlayed(team)}</td>
      <td>{getGoalsScored(team)}</td>
      <td>{getGoalsConceed(team)}</td>
      <td>{getUndefeated(team)}</td>
    </tr>
  ));

const generateTables = data => {
  const dates = Object.keys(data);
  return dates.map(date => (
    <Fragment>
      <h2>{date}</h2>
      <table key={nanoid()}>
        <tr>
          <td>Name</td>
          <td>Position</td>
          <td>Points</td>
          <td>Played</td>
          <td>GF</td>
          <td>GA</td>
          <td>Undefeated</td>
        </tr>
        {generateTeams(data[date])}
      </table>
    </Fragment>
  ));
};

const PremierLeagueContainer = ({ data }) => {
  if (!data) return null;

  const twoTables = {
    '2018-08-13': data.data['2018-08-13'],
    '2018-08-21': data.data['2018-08-21'],
  };

  return generateTables(twoTables);
};

PremierLeagueContainer.propTypes = {
  data: func.isRequired,
};

export default PremierLeagueContainer;
