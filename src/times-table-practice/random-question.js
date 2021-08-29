

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getQuestion = () => {
  let rndInt_1 = randomIntFromInterval(1, 10);
  let rndInt_2 = randomIntFromInterval(1, 10);
  let answer = rndInt_1 * rndInt_2;
  let quest = rndInt_1.toString() + " x " + rndInt_2.toString() + " = ";
  const newItem = {
    id: new Date().getTime().toString(),
    q: quest,
    a: answer,
  };
//   console.log(newItem);
  return newItem;
};