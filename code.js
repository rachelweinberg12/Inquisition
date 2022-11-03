//import questions from csv file
export const deck = [];
fetch("questions.csv").then((resp) => {
  resp.text().then(parseCSV);
});

//function takes response from fetch and reads CSV into deck
function parseCSV(txt) {
  //split text into array of strings representing cards
  const cards = txt.split("\n");
  //add each card to the deck
  for (let i = 1; i < cards.length; i++) {
    deck.push(buildCard(cards[i]));
  }
  //shuffle the deck
  //shuffle(deck);
}

// fxn takes string representing card & array of attribute labels and returns card object
function buildCard(cardStr) {
  let cardObj = {};
  let attributes;
  //add the question to the deck
  if (cardStr[0] === '"') {
    //handling special case with commas in question (there are actually more edge cases to handle, fix later)
    const qEnd = cardStr.indexOf('?",');
    //add the question to the card object
    cardObj.question = cardStr.slice(1, qEnd + 1);
    //build array of all other attributes
    attributes = cardStr.slice(qEnd + 3).split(",");
  } else {
    const qEnd = cardStr.indexOf("?,");
    //add the question to the card object
    cardObj.question = cardStr.slice(0, qEnd + 1);
    //build array of all other attributes
    attributes = cardStr.slice(qEnd + 2).split(",");
  }
  console.log(attributes);
  //add each of these attributes to the card object with column labels as keys
  cardObj.source = attributes[0];
  cardObj.quality = parseInt(attributes[1]);
  cardObj.intimacy = parseInt(attributes[2]);
  cardObj.tags = attributes[3].split(";");
  console.log(attributes[3]);
  cardObj.multiplePlayers = parseInt(attributes[4].trimEnd());
  //return the complete card object
  return cardObj;
}

/*
// fxn moves on to next question
function flip() {
  //increment question index
  if (index < deck.length - 1) {
    index++;
  } else {
    index = 0;
  }
  console.log("flipping", index);
  //update displayed question
  // document.getElementById("question").innerText = deck[index].Question; //update question text
}
*/

// fxn shuffles the whole deck
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
