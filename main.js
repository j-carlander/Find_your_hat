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
  static generateField(length, height, holePercentage) {
    // holePercentage
    let field = [];
    for (let y = 0; y < height; y++) {
      field.push([]);
      for (let x = 0; x < length; x++) {
        field[y].push("░");
      }
    }
    // player start point
    field[0][0] = "*";

    // adding holes = O
    let numOfHoles = Math.ceil((length * height * holePercentage) / 100);
    for (let i = 0; i < numOfHoles; i++) {
      let randomX = Math.floor(Math.random() * length);
      let randomY = Math.floor(Math.random() * height);
      while (randomX == 0 && randomY == 0) {
        randomY = Math.floor(Math.random() * height);
      } // if both coordinates is 0 rerun the Y-coordinate to not hit the 0,0
      field[randomX][randomY] = "O";
    }

    //Adding the hat to the game board
    let hatX = Math.floor(Math.random() * length);
    let hatY = Math.floor(Math.random() * height);
    while (hatX == 0 && hatY == 0) {
      randomY = Math.floor(Math.random() * height);
    } // if both coordinates is 0 rerun the Y-coordinate to not hit the 0,0
    field[hatX][hatY] = "^";

    return field;
  }
}

const testArray = [
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
];

const myField = new Field(Field.generateField(5, 5, 30));

// console.log(Field.generateField(5, 5, 30));
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
