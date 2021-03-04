import React, { Component } from 'react';
import { AuthConsumer } from './components/AuthContext';
import MainComponent from './components/MainComponent';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Profile from './components/Profile';
import ToolBar from './components/ToolBar/Toolbar';
import SideDrawer from './components/ToolBar/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollUpButton from 'react-scroll-up-button';
import NotFoundPage from './components/NotFoundPage';
import Notification from './components/Notification';

const App = () => {
  state = {
    sideDrawerOpen: false,
  };

  //if sidedraweropen, save as false
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  sideDrawerLinkClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    //co
    return (
      <React.Fragment>
        <Notification />
        <ScrollUpButton />
        <GlobalStyle />
        <SiteStyle>
          <div className="SiteContent">
            <Router>
              <ToolBar
                drawerClickHandler={this.drawerToggleClickHandler}
                handleLogoutState={this.props.handleLogoutState}
                handleLogin={this.props.handleLogin}
              />
              <SideDrawer
                show={this.state.sideDrawerOpen}
                close={this.sideDrawerLinkClickHandler}
                handleLogoutState={this.props.handleLogoutState}
                handleLogin={this.props.handleLogin}
              />
              {backdrop}
              <Switch>
                <Route
                  path="/profile"
                  render={() => (
                    <AuthConsumer>
                      {(authState) => {
                        if (authState.isAuth !== null) {
                          if (authState.isAuth === true) return <Profile />;
                          else return <Redirect to="/" />;
                        }
                      }}
                    </AuthConsumer>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/home" />;
                  }}
                />

                <Route path={['/home', '/search']} component={MainComponent} />
                <Route path="/FAQ" component={FAQ} />

                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Router>
          </div>
          <Footer />
        </SiteStyle>
      </React.Fragment>
    );
  }
}

export default App;

const SiteStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .SiteContent {
    flex: 1 0 auto;
  }
`;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap');

html {
	line-height: 1.15;
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	height: 100%;
	overflow-x: hidden;
	min-height: 100vh;
}

body{
	height: 100%;
	font-size: 1rem;
	font-weight: 300;
	line-height: 1.5;
	font-family: 'Lato', sans-serif;

	text-align: center !important;
  background: rgb(4,4,4);
  background: linear-gradient(90deg, rgba(4,4,4,1) 0%, rgba(19,19,19,1) 100%);




}

.pac-container {
	background-color:${(props) => props.theme.white};
	font-family: 'Lato', sans-serif;
}

`;
