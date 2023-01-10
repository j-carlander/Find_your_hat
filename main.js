const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldArray) {
    this.fieldArray = fieldArray;
  }

  print() {
    this.fieldArray.forEach((row) => {
      console.log(row.join(""));
    });
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.print();

let hatFound = false;
let fallingIn = false;
let startXY = [0, 0]; //start positions, x by startXY[0], y by startXY[1].

while (!hatFound && !fallingIn) {
  // Get user input
  let move = prompt("Choose direction, (u -up, d -down, l- left, r- right): ");
  switch (move) {
    case "d":
      startXY[1]++; //< myField.fieldArray.length ? startXY[1]++ : startXY[1];
      break;
    case "u":
      startXY[1]--; //>= 0 ? startXY[1]-- : startXY[1];
      break;
    case "r":
      startXY[0]++; // < myField.fieldArray[0].length ? startXY[0]-- : startXY[0];
      break;
    case "u":
      startXY[0]--; // >= 0 ? startXY[0]-- : startXY[0];
      break;
  }

  if (myField.fieldArray[startXY[1]][startXY[0]] == "^") {
    console.log("Congrats, you found it!");
    hatFound = true;
  } else if (myField.fieldArray[startXY[1]][startXY[0]] == "O") {
    console.log("Sorry, you fell down a hole!");
    fallingIn = true;
  } else {
    myField.fieldArray[startXY[1]][startXY[0]] = "*";
  }
  myField.print();
}
