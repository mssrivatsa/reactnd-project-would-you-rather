import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";
import { Segment, Header, Grid, Image } from "semantic-ui-react";

class Poll extends Component {
  render() {
    const { question, author, answered, invalidPoll } = this.props;

    if (invalidPoll) {
      return <Redirect to="/404" />;
    }

    return (
      <div align="center">
        <Segment.Group style={{ maxWidth: 500 }}>
          <Header as="h5" textAlign="left" block attached="top">
            {getHeaderText(answered, author)}
          </Header>
          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={4} verticalAlign="middle">
                <Image src={author.avatarURL} size="medium" />
              </Grid.Column>
              <Grid.Column width={12} textAlign="left">
                {answered ? (
                  <PollResult question={question} />
                ) : (
                  <PollQuestion question={question} />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      </div>
    );
  }
}

function getHeaderText(answered, author) {
  return answered ? `Asked by ${author.name}` : `${author.name} asks:`;
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
  const { qid } = match.params;
  let question, author, answered, user, invalidPoll;
  question = questions[qid];
  if (question === undefined) {
    invalidPoll = true;
  } else {
    author = users[question.author];
    user = users[authedUser];
    answered = Object.keys(user.answers).includes(qid);
  }

  return {
    question,
    author,
    answered,
    invalidPoll,
  };
}

export default connect(mapStateToProps)(Poll);
