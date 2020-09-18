import React, { Component } from "react";
import { connect } from "react-redux";
import Scorecard from "./Scorecard";

const colors = ["yellow", "green", "grey"];
class Leaderboard extends Component {
  render() {
    const { leaderboardData } = this.props;
    return (
      <div align="center">
        {leaderboardData.map((user, index) => (
          <Scorecard
            key={user.uid}
            uid={user.uid}
            name={user.name}
            avatar={user.avatar}
            answerCount={user.answerCount}
            questionCount={user.questionCount}
            score={user.score}
            icon="trophy"
            iconColor={colors[index]}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      uid: user.id,
      name: user.name,
      avatar: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      score: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return {
    leaderboardData,
  };
}

export default connect(mapStateToProps)(Leaderboard);
