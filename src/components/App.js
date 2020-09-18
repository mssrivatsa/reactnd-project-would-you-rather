import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { handleGetInitialData } from "../actions/shared";
import NavigationBar from "./NavigationBar";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import NewPoll from "./NewPoll";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.handleGetInitialData();
  }
  render() {
    const { signedIn } = this.props;

    return (
      <Router>
        <div className="container">
          {signedIn ? getSignedInRoutes() : getSignedOutRoutes()}
        </div>
      </Router>
    );
  }
}

function getSignedOutRoutes() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Fragment>
  );
}

function getSignedInRoutes() {
  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/questions/:qid" component={Poll} />
        <Route exact path="/add" component={NewPoll} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route exact path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    signedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps, { handleGetInitialData })(App);
