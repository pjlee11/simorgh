import React from 'react';

/* eslint-disable react/prop-types */
const Document = ({ assets, app, data, styleTags, helmet }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const meta = helmet.meta.toComponent();
  const title = helmet.title.toComponent();
  const links = helmet.link.toComponent();
  const serialisedData = JSON.stringify(data);
  const scripts = assets.map(asset => (
    <script
      crossOrigin="anonymous"
      key={asset}
      type="text/javascript"
      src={asset}
      defer
    />
  ));

  console.log(scripts);

  return (
    <html lang="en-GB" {...htmlAttrs}>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex,nofollow" />
        {meta}
        {title}
        {links}
        {styleTags}
      </head>
      <body>
        {/* eslint-disable react/no-danger */}
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.SIMORGH_DATA=${serialisedData}`,
          }}
        />
      </body>
    </html>
  );
};

export default Document;
