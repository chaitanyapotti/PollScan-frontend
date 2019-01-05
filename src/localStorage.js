export const loadState = () => {
  try {
    // console.log('Loading state');
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = state => {
  try {
    // console.log('Saving state in local storage');
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // die
    console.log(err);
  }
};
