import React from 'react';
import styled from 'styled-components';
import { T_BREVIER } from '../../lib/constants/typography';

const TileWrapper = styled.div`
  position: relative;
`;

const BlackGradientDiv = styled.div`
  background-color: #404040;
  position: absolute;
  background: linear-gradient(
    360deg,
    rgba(34, 34, 34, 1) 35%,
    rgba(34, 34, 34, 0) 100%
  );
  height: 70px;
  width: 100%;
  bottom: 0px;
`;

const Image = styled.img`
  width: 100%;
`;

const TileTitle = styled.h2`
  ${T_BREVIER};
  color: #eceae7;
  padding: 8px 8px 0;
  position: absolute;
  bottom: 10px;
  left: 0;
  margin: 0;
`;

const ImageContainer = ({ data }) => {
  const { shortTitle, url, image } = data;
  const { href, altText } = image;

  return (
    <a href={`https://www.bbc.com${url}`}>
      <TileWrapper>
        <Image src={href} alt={altText} />
        <BlackGradientDiv>
          <TileTitle>{shortTitle}</TileTitle>
        </BlackGradientDiv>
      </TileWrapper>
    </a>
  );
};

export default ImageContainer;
