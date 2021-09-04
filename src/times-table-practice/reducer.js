// reducer function

function compare(a, b) {
  // Use parseInt() to convert String to Int
  const idA = parseInt(a.id);
  const idB = parseInt(b.id);

  let comparison = 0;
  if (idA > idB) {
    comparison = 1;
  } else if (idA < idB) {
    comparison = -1;
  }
  return comparison * -1;
}

export const reducer = (state, action) => {
  if (action.type === "NEW_ANSWER") {
    // console.log("NEW_ANSWER");
    let user_answer = parseInt(action.payload["userInput"]);
    let correct_answer = action.payload["newquestion"].a;
    let current_numCorrectAnswer = 0;
    let current_buttonPopup = false;
    const rec_for_display =
      action.payload["newquestion"].q + action.payload["userInput"];
    if (user_answer === correct_answer) {
      action.payload.result = true;
      current_numCorrectAnswer = state.numCorrectAnswer + 1;
      // console.log(current_numCorrectAnswer);
    } else {
      action.payload.result = false;
      current_numCorrectAnswer = state.numCorrectAnswer;
    }
    if (current_numCorrectAnswer % 5 === 0 && current_numCorrectAnswer !== 0) {
      current_buttonPopup = true;
    } else {
      current_buttonPopup = false;
    }
    action.payload.display_rec = rec_for_display;
    const newUserAnswer = [...state.userAnswer, action.payload];
    const sortednewUserAnswer = newUserAnswer.sort(compare);
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Next",
      userAnswer: sortednewUserAnswer,
      buttonPopup: current_buttonPopup,
      numCorrectAnswer: current_numCorrectAnswer,
    };
  }
  if (action.type === "NO_VALUE") {
    console.log("NO_VALUE");
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Please enter your answer",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "CLOSE_POPUP") {
    return {
      ...state,
      buttonPopup: false,
      numCorrectAnswer: 0,
    };
  }
  throw new Error("no matching action type");
};
