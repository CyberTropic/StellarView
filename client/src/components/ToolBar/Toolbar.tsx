import React from 'react';
import DrawerToggleButton from './DrawerToggleButton';
import styled from 'styled-components';

import { withRouter, Link } from 'react-router-dom';

import logo from '../style/Media/StellarStarLogo.svg';
import SVG from 'react-inlinesvg';
import Tutorial from '../Tutorial';

const Toolbar = () => {
  return (
    <ToolbarStyle>
      <nav className="toolbar__navigation">
        {/* <DrawerToggleButton click={this.props.drawerClickHandler} /> */}
        <DrawerToggleButton />

        <div className="toolbarLogo">
          <Link to="/home">
            <SVG src={logo}></SVG>
          </Link>
        </div>

        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <div className="toolbarLink">
                <Tutorial>How it works</Tutorial>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/FAQ">
                <div className="toolbarLink faq">FAQ</div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </ToolbarStyle>
  );
};

export default withRouter(Toolbar);

const ToolbarStyle = styled.header`
  width: 100%;
  .toolbar__center {
    display: block;

    height: 100%;
    margin: 0.5rem auto 0 auto;
    width: 90%;

    @media screen and (min-width: 320px) {
      width: 90%;
      margin: 0.5rem auto 0 auto;
    }

    @media screen and (min-width: 480px) {
      width: 90%;
      margin: 0.5rem auto 0 auto;
    }

    @media screen and (min-width: 600px) {
      padding: 0px 6.5% 10px 6.5%;
      width: 100%;
      margin: 2rem auto 0 auto;
    }

    @media screen and (min-width: 1025px) {
      padding: 0px 6.5% 30px 6.5%;
      margin: 2rem auto 0 auto;
    }
  }

  @media screen and (min-width: 480px) {
    margin: 0.3rem 0px 0px 0px;
  }

  .toolbarLogo {
    text-align: left;
    margin-left: 10px;
    svg {
      width: 80%;
    }
  }

  .toolbar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    bottom: 0;
  }

  .toolbar_navigation-items {
    margin-top: 1%;

    a {
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.08em;
      transition: color 0.2s ease;
      color: ${(props) => props.theme.white};
      :hover,
      :active {
        transition: color 0.2s ease;
        color: ${(props) => props.theme.colorMedium};
      }
    }

    ul {
      text-transform: uppercase;
      list-style: none;
      padding: 0;
      display: flex;
    }
  }
  .faq {
    margin-left: 20px;
  }

  .toolbarLink {
    cursor: pointer;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.08em;
    transition: color 0.2s ease;
    color: ${(props) => props.theme.white};
    :hover,
    :active {
      transition: color 0.2s ease;
      color: ${(props) => props.theme.colorMedium};
    }
  }

  @media screen and (max-width: 320px) {
    .toolbar_navigation-items {
      display: none;
    }
  }
  @media screen and (min-width: 320px) {
    .toolbar_navigation-items {
      display: none;
    }
  }
  @media screen and (min-width: 600px) {
    .toolbar_navigation-items {
      display: flex;
    }
  }
`;
