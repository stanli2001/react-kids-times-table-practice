import React, { useState, useEffect, useReducer } from "react";
import Modal from "./Modal";
import { reducer } from "./reducer";
import { getQuestion } from "./random-question";

const defaultState = {
  isModalOpen: true,
  modalContent: "Hi kid, let's see if you can remember times table.",
  userAnswer: [],
};

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [newquestion, setNewQuestion] = useState([]);
  // const [userAnswer, setUserAnswer] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput) {
      const newItem = {
        id: new Date().getTime().toString(),
        newquestion,
        userInput,
      };
      dispatch({ type: "NEW_ANSWER", payload: newItem });

      setUserInput("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  useEffect(() => {
    // console.log("useEffect");
    const newItem = getQuestion();
    setNewQuestion(newItem);
    setTimeout(() => {
      closeModal();
    }, 2500);
  }, [state.userAnswer]);

  return (
    <>
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h3>
            {newquestion.q}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </h3>
        </div>
        <button type="submit">Submit</button>
      </form>
      {state.userAnswer.map((user_record) => {
        return (
          <div key={user_record.id} className="item">
            <item style={{ color: user_record["result"] ? "green" : "red" }}>
              {user_record["display_rec"]}
            </item>
          </div>
        );
      })}
    </>
  );
};

export default Index;
