import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Header, Segment, Progress, Label, Icon } from "semantic-ui-react";

export class PollResult extends Component {
  render() {
    const { question, user } = this.props;
    const prefixText = "Would you rather ";
    const authedUserVote = user.answers[question.id];
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <Fragment>
        <Header as="h3">Results:</Header>
        <Segment>
          {authedUserVote === "optionOne" && <AuthedUserLabel />}
          <p style={{ fontWeight: "bold" }}>
            {prefixText + question.optionOne.text}
          </p>
          <Progress
            progress
            percent={Math.round((optionOneVotes / totalVotes) * 100)}
            color="black"
          >
            {optionOneVotes} out of {totalVotes} votes
          </Progress>
        </Segment>
        <Segment>
          {authedUserVote === "optionTwo" && <AuthedUserLabel />}
          <p style={{ fontWeight: "bold" }}>
            {prefixText + question.optionTwo.text}
          </p>
          <Progress
            progress
            percent={Math.round((optionTwoVotes / totalVotes) * 100)}
            color="black"
          >
            {optionTwoVotes} out of {totalVotes} votes
          </Progress>
        </Segment>
      </Fragment>
    );
  }
}

const AuthedUserLabel = () => (
  <Label color="yellow" ribbon="right">
    <Icon name="thumbs up outline" size="big" />
    <div style={{ float: "right" }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));
