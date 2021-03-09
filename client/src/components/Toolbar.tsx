import React from 'react';
import styled from 'styled-components';

import { withRouter, Link } from 'react-router-dom';

import logo from './style/Media/StellarStarLogo.svg';
import SVG from 'react-inlinesvg';
import HelpIcon from '@material-ui/icons/Help';
const Toolbar = () => {
  return (
    <ToolbarStyle>
      <div className="toolbarLogo">
        <Link to="/home">
          <SVG src={logo}></SVG>
        </Link>
      </div>

      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <Link to="/FAQ">
              <HelpIcon />
            </Link>
          </li>
        </ul>
      </div>
    </ToolbarStyle>
  );
};

export default withRouter(Toolbar);

const ToolbarStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 85%;

  margin: 0 auto;
  max-width: 1100px;
  margin-top: 20px;

  .toolbarLogo {
    text-align: left;

    svg {
      width: 80%;
    }
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
      display: flex;
    }
  }
  @media screen and (min-width: 600px) {
    .toolbar_navigation-items {
      display: flex;
    }
  }
`;
