import Table from '../components/Table';
import getInitialData from './getInitialData';

const teamRegex = '[a-zA-Z-]+';
export const teamRegexPath = `/:team1(${teamRegex})-against-:team2(${teamRegex})`;

const routes = [
  {
    path: teamRegexPath,
    exact: true,
    component: Table,
    getInitialData,
  },
];

export default routes;
