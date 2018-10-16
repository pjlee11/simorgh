import Article from '../containers/Article';
import getInitialData from './getInitialData';
import services from '../lib/config/services';

export const tldRegex = 'https://www.bbc.(co.uk|com)';
const serviceRegex = Object.keys(services)
  .filter(serviceName => serviceName !== 'default')
  .join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
export const pathRegex = `/:service(${serviceRegex})/articles/:id(${idRegex}):amp(${ampRegex})?`;

const routes = [
  {
    path: pathRegex,
    exact: true,
    component: Article,
    getInitialData,
  },
];

export default routes;
