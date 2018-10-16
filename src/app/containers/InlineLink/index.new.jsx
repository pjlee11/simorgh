import React from 'react';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import InlineLink from '../../components/InlineLink';
import Blocks from '../Blocks';
import fragment from '../Fragment';
import { inlineLinkModelPropTypes } from '../../models/propTypes/inlineLink';
import { tldRegex, pathRegex } from '../../routes';

const InternalInlineLink = InlineLink.withComponent(Link);

const componentsToRender = { fragment };

const InlineLinkContainer = ({ locator, blocks }) => {
  // if URL matches a valid route, use a react-router link
  const wholeRegex = `(${tldRegex})${pathRegex}`;
  if (pathToRegexp(wholeRegex).exec(locator)) {
    const internalLocator = locator.replace(tldRegex, '');

    return (
      <InternalInlineLink to={internalLocator}>
        <span>Internal! </span>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </InternalInlineLink>
    );
  }

  // else return a normal hyperlink
  return (
    <InlineLink href={locator}>
      <Blocks blocks={blocks} componentsToRender={componentsToRender} />
    </InlineLink>
  );
};

InlineLinkContainer.propTypes = inlineLinkModelPropTypes;

export default InlineLinkContainer;
