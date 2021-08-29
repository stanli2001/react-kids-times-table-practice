import React, { useState, useEffect, useReducer } from "react";
import Modal from "./Modal";
import { reducer } from "./reducer";

const defaultState = {
  isModalOpen: true,
  modalContent: "Dear Lucia, let's see if you can remember times table.",
  userAnswer: [],
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Index = () => {
  const [userInput, setUserInput] = useState("");
  const [newquestion, setNewQuestion] = useState([]);
  // const [userAnswer, setUserAnswer] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const getQuestion = () => {
    let rndInt_1 = randomIntFromInterval(1, 10);
    let rndInt_2 = randomIntFromInterval(1, 10);
    let answer = rndInt_1 * rndInt_2;
    let quest = rndInt_1.toString() + " x " + rndInt_2.toString() + " = ";
    const newItem = {
      id: new Date().getTime().toString(),
      q: quest,
      a: answer,
    };
    console.log(newItem);
    setNewQuestion(newItem);
  };
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
    console.log("useEffect");
    // setUserAnswer("");
    getQuestion();
     setTimeout(() => {
       closeModal();
     }, 2500);
  }, [state.userAnswer]);

  return (
    <>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} />
      )}
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
            <h4 style={{ color: user_record["result"] ? "green" : "red" }}>
              {user_record["display_rec"]}
            </h4>
          </div>
        );
      })}
    </>
  );
};

export default Index;
