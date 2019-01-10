import 'isomorphic-fetch';
import React, { Fragment } from 'react';
import { bool, string, obj } from 'prop-types';
import styled from 'styled-components';
import nanoid from 'nanoid';
import Header from '../../components/Header';
import Footer from '../Footer';
import LocationStoryTile from '../LocationStoryTile';
import { T_TRAFALGAR } from '../../lib/constants/typography';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;

const Main = styled.main`
  padding: 16px;
`;

const Title = styled.h1`
  ${T_TRAFALGAR};
`;

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const LocationStoryIndexContainer = ({ loading, error, data }) => {
  const { results } = data.data;

  if (loading) return 'Loading...'; /* [1] */
  if (error) return 'Something went wrong :(';
  if (data) {
    return (
      <Fragment>
        <Header />
        <Main>
          <Title>Local News - Delhi (Hindi)</Title>
          <Wrapper>
            <Fragment>
              {results.map(story => (
                <LocationStoryTile data={story} key={nanoid()} />
              ))}
            </Fragment>
          </Wrapper>
        </Main>
        <Footer />
      </Fragment>
    );
  }

  return null;
};

LocationStoryIndexContainer.propTypes = {
  loading: bool,
  error: string,
  data: obj,
};

LocationStoryIndexContainer.defaultProps = {
  loading: false,
  error: null,
  data: {},
};

export default LocationStoryIndexContainer;
