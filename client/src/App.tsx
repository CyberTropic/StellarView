import React from 'react';
import MainComponent from './components/MainComponent';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ToolBar from './components/Toolbar';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollUpButton from 'react-scroll-up-button';
import NotFoundPage from './components/NotFoundPage';
import Notification from './components/Notification';

const App = () => {
  return (
    <React.Fragment>
      <Notification />
      <ScrollUpButton />
      <GlobalStyle />
      <SiteStyle>
        <div className="SiteContent">
          <Router>
            <ToolBar />
            <Switch>
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
};

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

#root{
  background-color: #000;
}


}

.pac-container {
	background-color:${(props) => props.theme.white};
	font-family: 'Lato', sans-serif;
}

`;
