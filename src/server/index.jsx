import React from 'react';
import express from 'express';
import { ServerApp, loadInitialData } from 'react-universal-app';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';
// not part of react-helmet
import helmet from 'helmet';
import routes from '../app/routes';

import Document from '../app/components/Document';

const server = express();
server
  .disable('x-powered-by')
  .use(helmet({ frameguard: { action: 'deny' } }))
  .get('/status', (req, res) => {
    res.sendStatus(200);
  })
  .get('/*', async ({ url }, res) => {
    try {
      const sheet = new ServerStyleSheet();
      const data = await loadInitialData(url, routes);

      const app = renderToString(
        sheet.collectStyles(
          <ServerApp location={url} routes={routes} data={data} context={{}} />,
        ),
      );

      const headHelmet = Helmet.renderStatic();

      const styleTags = sheet.getStyleElement();

      const doc = renderToStaticMarkup(
        <Document
          app={app}
          data={data}
          styleTags={styleTags}
          helmet={headHelmet}
        />,
      );

      res.send(`<!doctype html>${doc}`);
    } catch ({ message }) {
      res.status(404).send(message);
    }
  });

export default server;
