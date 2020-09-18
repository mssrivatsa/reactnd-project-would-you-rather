import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Image } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class NavigationBar extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    const { setAuthedUser } = this.props;
    setAuthedUser(null);
    return <Redirect to="/" />;
  };

  render() {
    const { users, authedUser } = this.props;
    const authedUserMsg = `Hello, ${users[authedUser].name} `;
    return (
      <Menu secondary>
        <Menu.Item name="Dashboard" as={NavLink} to="/" exact />
        <Menu.Item name="New Question" as={NavLink} to="/add" />
        <Menu.Item name="Leaderboard" as={NavLink} to="/leaderboard" />
        <Menu.Menu position="right">
          <Menu.Item>
            <span>{authedUserMsg}</span>
          </Menu.Item>
          <Menu.Item>
            <Image src={users[authedUser].avatarURL} avatar />
          </Menu.Item>
          <Menu.Item name="Logout" onClick={this.handleLogout} />
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthedUser })(NavigationBar);
