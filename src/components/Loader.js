// src/components/Loader.js
import React from 'react';
import { Puff as Loader } from 'react-loader-spinner'; // Import a specific component from react-loader-spinner
import styled from 'styled-components';

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomLoader = () => (
  <LoaderContainer>
    <Loader type="Puff" color="#00BFFF" height={100} width={100} />
  </LoaderContainer>
);

export default CustomLoader;
