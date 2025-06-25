/*
File: script.js
Aneesh Bathey, UMass Lowell Computer Science, aneesh_bathey@student.uml.edu
Copyright (c) 2025 by Aneesh Bathey. All rights reserved.
Updated by AB on June 25, 2025

Description: All of the backend logic for the Scrabble game. There are several data structures. ScrabbleTiles keeps track of each tile and information such as their values, distribution, number remaining and image source. TileSlotsFilled keeps track of which slots are occupied on the board. The dictionary array is used as a list of valid words, in this program there are only 100 words, but in a real world setting I would include a larger list of words. There are several functions, ResetTiles() to reset the tiles and score, SetTileRowDivPosition() to set the size of the tile board if the user resizes the window, GenerateTiles() to generate 7 new tiles, isValidTileRow() to determine if a word is a valid word found in the dictionary array, and lastly the .droppable function using jQuery used to set the position of tile when it is dropped onto the board. There are also click event listeners for the "Next word" and "Start over" button.
*/

const tileGrid = document.querySelector(".tile-grid");
const nextWordButton = document.querySelector("#nextWordButton");
const startOverButton = document.querySelector("#startOverButton");
const scoreLabel = document.querySelector("#score")

var ScrabbleTiles = [];
var TileSlotsFilled = ["", "", "", "", "", "", ""] // Represents tiles already filled on the board row
var score = 0;

// List of valid words
const dictionary = [
    "Apple", "Banana", "Cherry", "Dance", "Elephant", "Friend", "Good", "Home", "Jump", "Kite",
    "Laugh", "Moon", "Night", "Open", "Play", "Quiet", "Rain", "Snow", "Tree", "Umbra",
    "Visit", "Walk", "Xray", "Year", "Zeal", "Angry", "Brave", "Calm", "Dark", "Early",
    "Fast", "Green", "High", "Ice", "Joke", "King", "Love", "Mind", "Nice", "Old",
    "Play", "Queen", "Rock", "Star", "Time", "Ugly", "Van", "Wind", "Xoxo", "Yard",
    "Zinc", "Able", "Break", "Cell", "Deer", "Echo", "Find", "Give", "Hill", "Idea",
    "Jump", "Knock", "Leap", "Melt", "Near", "Open", "Park", "Quick", "Ready", "Song",
    "Turn", "Urge", "Vast", "Wolf", "Yes", "Zero", "Act", "Bark", "Call", "Dice",
    "Earn", "Fair", "Grow", "Help", "Icon", "Joke", "Keep", "Link", "Mask", "Neat",
    "Odd", "Peak", "Quiz", "Rest", "Seek", "Try", "Unit", "View", "Wish", "Year", "Ox", "Air", "A"
];

// Resets the tiles to their original distributions
function ResetTiles(clearScore) {
    // Array made by Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
    ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "image": "../images/tiles/Scrabble_Tile_A" };
    ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_B" };
    ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_C" };
    ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4,  "image": "../images/tiles/Scrabble_Tile_D" };
    ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "image": "../images/tiles/Scrabble_Tile_E" };
    ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_F" };
    ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3,  "image": "../images/tiles/Scrabble_Tile_G" };
    ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_H" };
    ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "image": "../images/tiles/Scrabble_Tile_I" };
    ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "image": "../images/tiles/Scrabble_Tile_J" };
    ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1,  "image": "../images/tiles/Scrabble_Tile_K" };
    ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image": "../images/tiles/Scrabble_Tile_L" };
    ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_M" };
    ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image": "../images/tiles/Scrabble_Tile_N" };
    ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8,  "image": "../images/tiles/Scrabble_Tile_O" };
    ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_P" };
    ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "image": "../images/tiles/Scrabble_Tile_Q" };
    ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image": "../images/tiles/Scrabble_Tile_R" };
    ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image": "../images/tiles/Scrabble_Tile_S" };
    ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image": "../images/tiles/Scrabble_Tile_T" };
    ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image": "../images/tiles/Scrabble_Tile_U" };
    ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_V" };
    ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_W" };
    ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "image": "../images/tiles/Scrabble_Tile_X" };
    ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_Y" };
    ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "image": "../images/tiles/Scrabble_Tile_Z" };
    ScrabbleTiles["Blank"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2,  "image": "../images/tiles/Scrabble_Tile_Blank" };

    for (let i = 0; i < TileSlotsFilled.length; i++) {
        TileSlotsFilled[i] = "";
    }

    if (clearScore) {
        score = 0;
        scoreLabel.textContent = "Word: N/A | Score: 0"
    }
}

// Update position of "invisible" div
function SetTileRowDivPosition() {
    const reference = $("#tile-row");
    const target = $("#tiles-div");
    const offset = reference.offset();

    target.css({
        position: "absolute",
        top: offset.top,
        left: offset.left
    });
}

// Generates 7 tiles from the tiles remaining
function GenerateTiles() {
    // Remove existing tiles
    $(".tile-grid .tile").remove();
    $("#tiles-div .tile").remove();

    const letterBag = [];

    for (const letter in ScrabbleTiles) {
        const count = ScrabbleTiles[letter]["number-remaining"];

        for (let i = 0; i < count; i++) {
            letterBag.push(letter);
        }
    }

    const drawn = [];
    
    for (let i = 0; i < 7; i++) {
        const index = Math.floor(Math.random() * letterBag.length);
        drawn.push(letterBag.splice(index, 1)[0]);
    }

    for (let i = 0; i < drawn.length; i++) {
        const letter = drawn[i];
        const img = document.createElement("img");
        img.src = "images/tiles/Scrabble_Tile_" + letter + ".jpg";
        img.classList.add("tile");
        img.classList.add("tile-" + letter);
        tileGrid.appendChild(img);
    }

    // Enables dragging
    $(function() {
        $(".tile").draggable({
            revert: "invalid",
            cursor: "move"
        });
    });
}

function isValidTileRow(arr) {
    const first = arr.findIndex(x => x !== "");
    const last = arr.length - 1 - [...arr].reverse().findIndex(x => x !== "");

    // No letters found
    if (first === -1) return false;

    // Check if there's any "" between first and last
    for (let i = first; i <= last; i++) {
        if (arr[i] === "") return false;
    }

    let str = "";

    for (let i = first; i <= last; i++) {
        str += arr[i];
    }

    if (!dictionary.find(word => word.toUpperCase() === str)) {
        return false;
    }

    // Add to score
    for (let i = first; i <= last; i++) {
        score += ScrabbleTiles[TileSlotsFilled[i]].value;

        if (i == 1 || i == 5) { // Double points slot
            score += ScrabbleTiles[TileSlotsFilled[i]].value;
        }
    }

    scoreLabel.textContent = "Word: " + str + " | " + "Score: " + score;

    return true;
}

ResetTiles();
SetTileRowDivPosition();
GenerateTiles();

// What to do when the tile is dropped
$("#tile-row-div").droppable({
    accept: ".tile",
    drop: function(event, ui) {
        const dropZone = $(this).find("#tiles-div");
        const tile = $(ui.draggable);

        // Calculate drop position relative to tiles-div
        const dropOffset = dropZone.offset();
        const relX = ui.offset.left - dropOffset.left;
        const snappedX = Math.max(0, Math.min(6, Math.round(relX / 82))) * 82; // Snaps to a square in the tiles row image
        const tileNumber = (snappedX / 82) + 1;

        if (TileSlotsFilled[tileNumber - 1] !== "") {
            return;
        }

        const hasTileDashClass = [...tile[0].classList].some(cls => cls.startsWith("tile-"));

        if (hasTileDashClass) {
            const matchingClass = [...tile[0].classList].find(cls => cls.startsWith("tile-"));
            const suffix = matchingClass.split("-")[1];
            TileSlotsFilled[tileNumber - 1] = suffix;
        }

        // Append tile to tiles-div
        tile.appendTo(dropZone);

        // Set exact position and size
        tile.css({
            position: "absolute",
            top: "2px",
            left: snappedX + "px",
            width: "82px",
            height: "82px"
        });

        // Disable dragging after placed on board
        tile.draggable("disable");
    }
});

// Keeps the tiles played in position if the user resizes their screen
window.addEventListener("resize", function() {
    SetTileRowDivPosition();
});

// Checks if the word is valid and new tiles are picked if valid
nextWordButton.addEventListener("click", function(event) {
    const valid = isValidTileRow(TileSlotsFilled);
    
    if (valid) {
        // Clear board
        for (let i = 0; i < TileSlotsFilled.length; i++) {
            TileSlotsFilled[i] = "";
        }

        // Pick from remaining tiles
        GenerateTiles();
    }
});

// For restarting the game
startOverButton.addEventListener("click", function(event) {
    ResetTiles(true);
    SetTileRowDivPosition();
    GenerateTiles();
});