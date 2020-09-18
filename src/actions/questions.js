// - getQuestions (GET_QUESTIONS): {}
// - updateQuestionUsers (UPDATE_QUESTION_USERS) : {qid, uid}
// - addNewQuestion (ADD_NEW_QUESTION): {optionOneText, optionTwoText, uid}
// - handleCreateQuestion : {optionOneText, optionTwoText, uid}

import { updateUserQuestions } from "./users";
import { saveQuestion } from "../utils/api";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const UPDATE_QUESTION_USERS = "UPDATE_QUESTION_USERS";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

export const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    questions,
  };
};

export const updateQuestionUsers = (uid, qid, answer) => {
  return {
    type: UPDATE_QUESTION_USERS,
    uid,
    qid,
    answer,
  };
};

export const addNewQuestion = (question) => {
  return {
    type: ADD_NEW_QUESTION,
    question,
  };
};

export const handleCreateQuestion = (optionOneText, optionTwoText, author) => {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addNewQuestion(question));
        dispatch(updateUserQuestions(author, question.id));
      }
    );
  };
};
