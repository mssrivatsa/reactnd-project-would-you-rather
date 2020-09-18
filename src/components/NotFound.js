import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";

export class NotFound extends Component {
  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1">Oops!</Header>
          <Header as="h3">
            We can't seem to find the page you're looking for.
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default NotFound;
