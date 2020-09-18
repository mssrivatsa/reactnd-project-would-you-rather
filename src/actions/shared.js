import { getUsers } from "./users";
import { getQuestions } from "./questions";
import { getInitialData } from "../utils/api";

export const handleGetInitialData = () => {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
  };
};
