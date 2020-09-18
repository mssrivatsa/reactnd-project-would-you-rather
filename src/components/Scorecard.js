import React, { Component } from "react";
import {
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider,
} from "semantic-ui-react";

class Scorecard extends Component {
  render() {
    const {
      name,
      uid,
      avatar,
      answerCount,
      questionCount,
      score,
      icon,
      iconColor,
    } = this.props;
    return (
      <Segment.Group key={uid} style={{ maxWidth: 500 }}>
        <Label corner="left" icon={icon} color={iconColor} />
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={4} verticalAlign="middle">
              <Image src={avatar} size="small" />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h3" textAlign="left">
                {name}
              </Header>
              <Grid>
                <Grid.Column textAlign="left" width={12}>
                  Answered questions
                </Grid.Column>
                <Grid.Column width={4}>{answerCount}</Grid.Column>
              </Grid>
              <Divider />
              <Grid>
                <Grid.Column textAlign="left" width={12}>
                  Created questions
                </Grid.Column>
                <Grid.Column width={4}>{questionCount}</Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={4} textAlign="center">
              <Segment.Group>
                <Header as="h4" content="Score" attached="top" block />
                <Segment>
                  <Label color={iconColor} size="big" circular>
                    {score}
                  </Label>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

export default Scorecard;
