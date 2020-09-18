import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Grid, Header, Segment, Divider } from "semantic-ui-react";
import { handleCreateQuestion } from "../actions/questions";
import { connect } from "react-redux";

class NewPoll extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    success: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { handleCreateQuestion, authedUser } = this.props;
    const { optionOne, optionTwo } = this.state;
    handleCreateQuestion(optionOne, optionTwo, authedUser);
    this.setState((prevState) => ({
      success: !prevState.success,
    }));
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    const disabled = optionOne === "" || optionTwo === "";
    if (this.state.success) {
      return <Redirect push to="/" />;
    }
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Segment.Group>
            <Segment>
              <Header as="h2" textAlign="center">
                Create New Question
              </Header>
            </Segment>
            <Segment>
              <Header as="h5" textAlign="left">
                Complete the question
              </Header>
              <Header as="h3" textAlign="left">
                Would you rather ...
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Form.Input
                  id="optionOne"
                  value={this.state.optionOne}
                  placeholder="Enter Option One Text Here"
                  onChange={this.onChange}
                />
                <Divider horizontal>Or</Divider>
                <Form.Input
                  id="optionTwo"
                  value={this.state.optionTwo}
                  placeholder="Enter Option Two Text Here"
                  onChange={this.onChange}
                  required
                />
                <Form.Button
                  color="black"
                  content="Submit"
                  disabled={disabled}
                  fluid
                />
              </Form>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, { handleCreateQuestion })(NewPoll);
