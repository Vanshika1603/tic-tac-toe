let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let player = document.querySelector("#player");
let main = document.querySelector("#main");
let count = 0;
let ifdraw= true;

//win patterns are initialize that can lead to winning of any player

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//showing clicking of boxes and changing its text to O and X

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        
        // console.log("box");
        if(turnO){
            box.innerText ="O";
            box.style.color = "green";
            count++;
            turnO= false;
            player.innerText= "Player 2 for X";
            player.style.color = "#b0413e";
        }
        else{
            box.innerText = "X";
            box.style.color = "#b0413e";
            count++;
            turnO= true;
            player.innerText= "Player 1 for O";
            player.style.color ="green";
        }


        box.disabled = true;

        checkWinner();
        
    })
});

//one the winner is found no need of input from player required so disabling the boxes

const disableBoxes =()=>{
    for (let box of boxes ){
        box.disabled = true;
    }
}

//allowing clicking of boxxes again so that we can play the game

const enableBoxes =()=>{
    for (let box of boxes ){
        box.disabled = false;
        box.innerText="";
    }
};

// showing the winner of the game in new text form

const showWinner = (winner) => {
    let y=  winner;
    msg.innerText= 'Congratulations, Winner is ' +y;
    msgContainer.classList.remove("hide");
    disableBoxes();

};

const drawGame = () => {
    msg.innerText= 'It is a Draw Play a New Game';
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//checking the winner condition digonally horizontally and vertically for both O and X

const checkWinner = () => {
    for(let pattern of winPatterns){
          let pos1val= boxes[pattern[0]].innerText;
          let pos2val= boxes[pattern[1]].innerText;
          let pos3val= boxes[pattern[2]].innerText;
          
           if(pos1val!= "" && pos2val!="" && pos3val!= "" ){
            
            if(pos1val===pos2val && pos2val=== pos3val&& count <= 9){
                ifdraw= false;
                showWinner(pos1val);
                main.classList.add("hide");

            }
            if(count == 9){
                if(ifdraw){
                    drawGame();
                } 
              }
           }

    }
};

//reseting the game 

const resetGame =() =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    player.innerText= "Player 1 for O";
    count =0;
    ifdraw= true;

};

// reseting new game
const newGame =() =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("hide");
    player.innerText= "Player 1 for O";
    count =0;
    ifdraw= true;
    
};

//applying the reset function on the buttons in html

newGameBtn.addEventListener("click",newGame);
resetBtn.addEventListener("click",resetGame);