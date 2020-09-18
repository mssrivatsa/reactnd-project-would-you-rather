import React, { Component, Fragment } from "react";
import { Form, Header } from "semantic-ui-react";
import { handleSaveQuestionAnswer } from "../actions/users";
import { connect } from "react-redux";
class PollQuestion extends Component {
  state = {
    value: "optionOne",
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { authedUser, question, handleSaveQuestionAnswer } = this.props;
    handleSaveQuestionAnswer(authedUser, question.id, value);
  };
  render() {
    const { value } = this.state;
    const { question } = this.props;

    return (
      <Fragment>
        <Header as="h3" textAlign="left">
          Would you rather ...
        </Header>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Radio
            label={question.optionOne.text}
            name="radioGroup"
            value="optionOne"
            checked={value === "optionOne"}
            onChange={this.handleChange}
          />
          <Form.Radio
            label={question.optionTwo.text}
            name="radioGroup"
            value="optionTwo"
            checked={value === "optionTwo"}
            onChange={this.handleChange}
          />
          <Form.Button color="black" content="Submit" fluid />
        </Form>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  PollQuestion
);
