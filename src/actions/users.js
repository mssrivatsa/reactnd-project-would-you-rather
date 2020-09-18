import { updateQuestionUsers } from "./questions";
import { saveQuestionAnswer } from "../utils/api";

export const GET_USERS = "GET_USERS";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const updateUserAnswers = (uid, qid, answer) => {
  return {
    type: UPDATE_USER_ANSWERS,
    uid,
    qid,
    answer,
  };
};

export const updateUserQuestions = (author, id) => {
  return {
    type: UPDATE_USER_QUESTIONS,
    author,
    id,
  };
};

export const handleSaveQuestionAnswer = (authedUser, qid, answer) => {
  return (dispatch) => {
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(updateUserAnswers(authedUser, qid, answer));
      dispatch(updateQuestionUsers(authedUser, qid, answer));
    });
  };
};
