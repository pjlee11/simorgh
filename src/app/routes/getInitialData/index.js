import 'isomorphic-fetch';
import fs from 'fs';
import https from 'https';
import sportDataHostName from '../../../config';

const formatDateTime = dateObj => {
  const fullYear = dateObj.getFullYear();
  const monthTwoDigit = dateObj.toLocaleDateString('en-GB', {
    month: '2-digit',
  });
  const dayTwoDigit = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
  });

  return `${fullYear}-${monthTwoDigit}-${dayTwoDigit}`;
};

const getDateMinusTenYearWithoutTime = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  return formatDateTime(new Date(year - 10, month, day));
};

const getDateWithoutTime = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();
  return formatDateTime(new Date(year, month, day));
};

const getInitialData = async ({ match }) => {
  let data = {};
  const dateFrom = getDateMinusTenYearWithoutTime();
  const dateTo = getDateWithoutTime();
  const { team1, team2 } = match.params;

  try {
    const options = {
      key: fs.readFileSync('cert/client.key'),
      cert: fs.readFileSync('cert/client.crt'),
      host: sportDataHostName,
      path: `/sportsdata/api/sport/soccer/team/${team1}/events?start-date-after=${dateFrom}&end-date-after=${dateTo}&against-team=${team2}&date-order=DESCENDING&with-site=false&key-events=true`,
    };

    const callback = response => {
      let str = '';
      response.on('data', chunk => {
        str += chunk;
      });

      response.on('end', () => {
        console.log(str);
        // do stuff with the XML here
        data = str;
      });
    };

    https.request(options, callback).end();
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return {};
  }

  return data;
};

export default getInitialData;
