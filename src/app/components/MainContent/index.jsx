import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import { layoutGridWrapper } from '../../lib/layoutGrid';

export const StyledMainContent = styled.main`
  ${layoutGridWrapper};
  background-color: #f1f5f3;
`;

const MainContent = ({ children }) => (
  <StyledMainContent role="main">{children}</StyledMainContent>
);

MainContent.propTypes = {
  children: node.isRequired,
};

export default MainContent;
