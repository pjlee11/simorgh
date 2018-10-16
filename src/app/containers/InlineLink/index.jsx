import React from 'react';
import { Link } from 'react-router-dom';
import { string, node } from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import InlineLink from '../../components/InlineLink';
import { tldRegex, pathRegex } from '../../routes';

const InternalInlineLink = InlineLink.withComponent(Link);

const InlineLinkContainer = ({ href, children, ...rest }) => {
  const result = pathToRegexp(pathRegex, [], { start: false, end: false });
  console.log(pathRegex);
  console.log(result);
  console.log(result.exec(href));
  // if URL matches a valid route, use a react-router link
  if (result.exec(href)) {
    const internalHref = href.replace(tldRegex, '');

    return (
      <InternalInlineLink to={internalHref} {...rest}>
        <span>Internal! </span>
        {children}
      </InternalInlineLink>
    );
  }

  // else return a normal hyperlink
  return (
    <InlineLink href={href} {...rest}>
      {children}
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = {
  href: string.isRequired,
  children: node.isRequired,
};

export default InlineLinkContainer;
