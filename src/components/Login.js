import React, { Component } from "react";
import logo from "../assets/logo.png";
import { Form, Grid, Header, Image } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { setAuthedUser } = this.props;
    const { value } = this.state;
    setAuthedUser(value);
  };

  getUsers = () => {
    const { users } = this.props;
    return Object.values(users).map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
    }));
  };

  render() {
    const { value } = this.state;
    const disabled = value === null;
    return (
      <Grid
        textAlign="center"
        style={{ height: "75vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h3" textAlign="center">
            <Header.Content>Welcome to Would You Rather App!</Header.Content>
            <Header.Subheader>Please sign in to continue</Header.Subheader>
          </Header>
          <br />
          <Image src={logo} size="small" centered />
          <br />
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Dropdown
              placeholder="Select User"
              options={this.getUsers()}
              value={value}
              onChange={this.handleChange}
              required
              fluid
              selection
              scrolling
            />
            <Form.Button
              color="black"
              content="Sign In"
              disabled={disabled}
              fluid
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps, { setAuthedUser })(Login);
