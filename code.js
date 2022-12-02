//import questions from csv file
const deck = [];
let tagPrefs = [];
let sourcePrefs = [];
/*
fetch("questions.csv").then((resp) => {
  resp.text().then(parseCSV);
});

/*async*/ export function loadDeckAndPrefs(txt) {
  //split text into array of strings representing cards
  const cards = txt.split("\n");
  //add each card to the deck
  for (let i = 1; i < cards.length; i++) {
    deck.push(buildCard(cards[i]));
  }
  return [deck, tagPrefs, sourcePrefs];
}

/*
//function takes response from fetch and reads CSV into deck
function parseCSV(txt) {
  //split text into array of strings representing cards
  const cards = txt.split("\n");
  //add each card to the deck
  for (let i = 1; i < cards.length; i++) {
    deck.push(buildCard(cards[i]));
  }
}
*/

// fxn takes string representing card & array of attribute labels and returns card object
function buildCard(cardStr) {
  let cardObj = {};
  let cardInfo = findQuestion(cardStr);
  let attributes = cardInfo[1];
  let question = cardInfo[0].toLocaleLowerCase();
  //add the question to the card object
  cardObj["question"] = question;
  //add each of these attributes to the card object with column labels as keys
  cardObj.source = attributes[0];
  //add any not-yet-seen source to the tagPrefs object
  if (!optionAdded(cardObj.source, sourcePrefs)) {
    sourcePrefs.push({ name: cardObj.source, pref: true });
  }
  cardObj.quality = parseInt(attributes[1]);
  cardObj.intimacy = parseInt(attributes[2]);
  cardObj.tags = attributes[3].split(";");
  cardObj.twoPlayer = !attributes[4];
  //add any not-yet-seen tag to the tagPrefs object
  for (let i = 0; i < cardObj.tags.length; i++) {
    cardObj.tags[i] = cardObj.tags[i].trim();
    if (!optionAdded(cardObj.tags[i], tagPrefs)) {
      tagPrefs.push({ name: cardObj.tags[i], pref: 1 });
    }
  }
  //return the complete card object
  return cardObj;
}

//checks if a tag has already been added to tagPrefs
function optionAdded(opt, options) {
  for (let i = 0; i < options.length; i++) {
    if (options[i].name === opt) {
      return true;
    }
  }
  return false;
}

function findQuestion(cardStr) {
  if (cardStr[0] === '"') {
    let i = 1;
    while (i < cardStr.length) {
      if (cardStr[i] === '"') {
        if (cardStr[i + 1] === '"') {
          cardStr =
            cardStr.substring(0, i) + cardStr.substring(i + 1, cardStr.length);
        } else {
          return [
            cardStr.slice(1, i),
            cardStr
              .slice(i + 2)
              .trimEnd()
              .split(","),
          ];
        }
      }
      i++;
    }
  } else {
    return [
      cardStr.slice(0, cardStr.indexOf(",")),
      cardStr
        .slice(cardStr.indexOf(",") + 1)
        .trimEnd()
        .split(","),
    ];
  }
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
*/
