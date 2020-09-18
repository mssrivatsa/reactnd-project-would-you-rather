import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import QuestionCard from "./QuestionCard";

class Dashboard extends Component {
  render() {
    const { dashboardData } = this.props;
    const tabPanes = [];
    tabPanes.push(
      TabPane(
        "Unanswered",
        dashboardData.unansweredQuestions,
        dashboardData.users
      )
    );
    tabPanes.push(
      TabPane("Answered", dashboardData.answeredQuestions, dashboardData.users)
    );
    return (
      <div align="center">
        <Tab style={{ maxWidth: 500 }} panes={tabPanes} />
      </div>
    );
  }
}

function TabPane(id, questions, users) {
  return {
    menuItem: id,
    render: () => (
      <Tab.Pane>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            author={users[question.author].name}
            avatar={users[question.author].avatarURL}
          />
        ))}
      </Tab.Pane>
    ),
  };
}

function mapStateToProps({ authedUser, users, questions }) {
  const answers = Object.keys(users[authedUser].answers);
  const questionList = Object.values(questions);
  const answeredQuestions = questionList
    .filter((question) => answers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = questionList
    .filter((question) => !answers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    dashboardData: {
      users,
      unansweredQuestions,
      answeredQuestions,
    },
  };
}

export default connect(mapStateToProps)(Dashboard);
