export const loadState = () => {
  try {
    const SerializedState = localStorage.getItem("state");
    if (SerializedState == "null") {
      return undefined;
    }
    return JSON.parse(SerializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const SerializedState = JSON.stringify(state);
    localStorage.setItem("state", SerializedState);
  } catch (err) {}
};
