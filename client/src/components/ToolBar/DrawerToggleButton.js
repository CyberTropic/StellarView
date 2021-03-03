import React from 'react';
import hamburgerMenu from '../style/Media/sharp-menu-24px.svg';
import styled from 'styled-components';

const drawerToggleButton = (props) => (
  <Hamburger onClick={props.click}>
    <img src={hamburgerMenu} />
  </Hamburger>
);

export default drawerToggleButton;

const Hamburger = styled.button`
  background: transparent;
  border: none;
  display: block;
  cursor: pointer;
  img {
    pointer-events: none;
  }

  @media screen and (min-width: 600px) {
    display: none;
  }
`;
