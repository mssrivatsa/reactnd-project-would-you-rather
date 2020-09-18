import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Segment, Grid, Header, Image, Button } from "semantic-ui-react";

class QuestionCard extends Component {
  state = {
    clicked: false,
  };
  handleViewPoll = (e) => {
    this.setState((prevState) => ({
      clicked: !prevState.clicked,
    }));
  };
  render() {
    const { question, author, avatar } = this.props;
    if (this.state.clicked) {
      const url = `/questions/${question.id}`;
      return <Redirect push to={url} />;
    }
    return (
      <Segment.Group key={question.id}>
        <Segment>
          <Header as="h3" textAlign="left">
            {author} asks:
          </Header>
        </Segment>
        <Segment>
          <Grid padded>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={avatar} size="small" />
              </Grid.Column>
              <Grid.Column width={12}>
                <Header as="h4" textAlign="left">
                  Would you rather
                </Header>
                <p style={{ textAlign: "center" }}>
                  {question.optionOne.text}
                  <br />
                  or...
                </p>
                <Button
                  color="black"
                  size="tiny"
                  onClick={this.handleViewPoll}
                  content="View Poll"
                  fluid
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}

export default QuestionCard;
