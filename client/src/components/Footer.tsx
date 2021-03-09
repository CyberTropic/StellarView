import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {
  render() {
    return (
      <FooterStyle>
        <span className="Contact">
          <a href="mailto:dev@stellargaze.com">dev@stellargaze.com</a>
        </span>
      </FooterStyle>
    );
  }
}

export default Footer;

const FooterStyle = styled.div`
  width: 100%;
  font-family: Lato;
  align-items: center;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.cardLight};
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 11px;

  a {
    all: unset;
    padding: 0px 4px;
    :hover,
    :active {
      color: ${(props) => props.theme.highlightPink};
      transition: color 0.2s ease;
      cursor: pointer;
    }
  }
`;
