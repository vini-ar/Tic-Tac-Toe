(function() {
    const game = {
        moveCounter: 0,
        playerTurn: '',
        playerOne: {
            name: "",
            displayName: function() {
                return this.name
            },
            mark: function() {
                return "X"
            }
        },
        playerTwo: {
            name: "",
            displayName: function() {
                return this.name
            },
            mark: function() {
                return "O"
            }
        },
        init: function() {
            this.cacheDom()
            this.bindEvents()
        },
        cacheDom: function() {
            this.gameBoardContainer = document.querySelector(".gameboard")
            this.squareContainer = document.querySelector(".square-container")
            this.squareBtnNodeList = document.querySelectorAll(".square-btn");
            this.startGameButton = document.querySelector("#start-game-btn");
            this.displayPlayerTurnSpan = document.querySelector("#display-player-turn");
            this.squareOneBtn = document.querySelector("#square-1-btn");
            this.squareTwoBtn = document.querySelector("#square-2-btn");
            this.squareThreeBtn = document.querySelector("#square-3-btn");
            this.squareFourBtn = document.querySelector("#square-4-btn");
            this.squareFiveBtn = document.querySelector("#square-5-btn");
            this.squareSixBtn = document.querySelector("#square-6-btn");
            this.squareSevenBtn = document.querySelector("#square-7-btn");
            this.squareEightBtn = document.querySelector("#square-8-btn");
            this.squareNineBtn = document.querySelector("#square-9-btn");
        },
        bindEvents: function() {
            this.showAlert()
            this.startGameButton.addEventListener("click", () => {
                this.startNewGame()
            })
            this.squareBtnNodeList.forEach((button) => 
                button.addEventListener("click", () => this.updateGame(button))
            )
            this.squareBtnNodeList.forEach((button) => button.setAttribute("disabled", ""))
        },
        showAlert: function() {
            const showAlert = () => {
                alert("Please Press Start Button")
            }
            this.showAlertFunction = showAlert;
            this.gameBoardContainer.addEventListener("click", showAlert)
        },
        startNewGame: function() {
            this.moveCounter = 0;
            this.displayPlayerTurnSpan.textContent =  this.playerOne.displayName();
            this.playerTurn = this.playerOne.displayName();
            this.getUserInput();
            this.unbindAlert();
            this.cleanGameBoard();
            this.enableButtons();
        },
        getUserInput: function() {
            this.playerOne.name = prompt('Player One Name:')
            this.playerTwo.name = prompt('Player Two Name:')
        },
        unbindAlert: function() {
            this.gameBoardContainer.removeEventListener("click", this.showAlertFunction);
        },
        cleanGameBoard: function(){
            this.squareBtnNodeList.forEach(button => {
                button.textContent = "";
            })
        },
        enableButtons: function() {
            this.squareBtnNodeList.forEach(button => button.removeAttribute("disabled"))
        },
        updateGame: function(button) {
            this.updateGameBoardDisplay(button.value);
            if (this.moveCounter >= 4) {
                this.checkGameResult()
            }
            button.setAttribute("disabled", "")
            this.moveCounter++;
            this.updatePlayerTurn();
        },
        updatePlayerTurn: function() {
            if (this.moveCounter % 2 === 0) {
                this.playerTurn = this.playerOne.displayName()
            }
            else {
                this.playerTurn = this.playerTwo.displayName()
            }
        },
        updateGameBoardDisplay: function(squarePosition) {
            let square = document.querySelector(`.square-btn[value='${squarePosition}']`)
            if (this.playerTurn === this.playerOne.displayName()) {
                square.textContent = this.playerOne.mark()
                this.displayPlayerTurnSpan.textContent = this.playerTwo.displayName();
            }
            else {
                square.textContent = this.playerTwo.mark()
                this.displayPlayerTurnSpan.textContent = this.playerOne.displayName();
            }
        },
        checkGameResult: function() {
        const winPatterns = [
            [this.squareOneBtn, this.squareTwoBtn, this.squareThreeBtn],
            [this.squareFourBtn, this.squareFiveBtn, this.squareSixBtn],
            [this.squareSevenBtn, this.squareEightBtn, this.squareNineBtn],
            [this.squareOneBtn, this.squareFourBtn, this.squareSevenBtn],
            [this.squareTwoBtn, this.squareFiveBtn, this.squareEightBtn],
            [this.squareThreeBtn, this.squareSixBtn, this.squareNineBtn],
            [this.squareOneBtn, this.squareFiveBtn, this.squareNineBtn],
            [this.squareThreeBtn, this.squareFiveBtn, this.squareSevenBtn]
        ];

        let winner = null;
        winPatterns.forEach(pattern => {
            if (pattern[0].textContent && 
                pattern[0].textContent === pattern[1].textContent &&
                pattern[1].textContent === pattern[2].textContent) {
                winner = true;
            }
        });

        if (winner) {
            this.finishGame();
        } else {
            const allSquaresFilled = Array.from(this.squareBtnNodeList).every(button => button.textContent);
            if (allSquaresFilled) {
                this.finishDrawGame();
            }
        }
    },
        finishGame: function(){
            this.squareBtnNodeList.forEach((button) => {
                button.setAttribute("disabled", "")
            })
            this.displayPlayerTurnSpan.textContent = this.playerTurn + " Wins!"
        },
        finishDrawGame: function() {
            this.squareBtnNodeList.forEach((button) => {
                button.setAttribute("disabled", "")
            })
            this.displayPlayerTurnSpan.textContent = "Draw"
        }
    }
    game.init();
})()