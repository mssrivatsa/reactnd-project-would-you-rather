const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Current action:", action);
  const response = next(action);
  console.log("New store state: ", store.getState());
  console.groupEnd();
  return response;
};

export default logger;
