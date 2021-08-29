// reducer function

export const reducer = (state, action) => {
  if (action.type === "NEW_ANSWER") {
    // console.log("NEW_ANSWER");
    let user_answer = parseInt(action.payload["userInput"]);
    let correct_answer = action.payload["newquestion"].a;   
     const rec_for_display =
       action.payload["newquestion"].q + action.payload["userInput"];
    if (user_answer === correct_answer) {           
      action.payload.result = true;
    } else {
      action.payload.result = false;
    }
    action.payload.display_rec = rec_for_display;
    const newUserAnswer = [...state.userAnswer, action.payload];
    return {
      ...state,
      isModalOpen: true,
      modalContent: "Next",
      userAnswer: newUserAnswer,
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
  throw new Error("no matching action type");
};
