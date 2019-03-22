const gamebox = Array.from(document.querySelectorAll('.gamebox'));
const newgamebtn = document.querySelector('#btn');
const gamecontainer = document.querySelector('.game-container');
const gameInfo = document.querySelector("#gameinfo");
gamePiece=['X','O'];
winningCombinations=['123','147','159','258','357','369','456','789'];
let patternsX=[];
let findCombos=[];
let win=0;

const gameBoard = function(){
  //Initialize game
  
  gamebox.forEach((ctl)=>{
    ctl.classList.remove('selected','X');
    gamebox[ctl.classList.item(1)].innerText="";
  });
  //newgamebtn.style.display='none';
}

function addMark(e){
    let c=0;
    //check if the box clicked already contains a mark
    if(e.target.classList.contains('selected')){
      return;
    }
    //Add a mark
    let box=e.target;
    box.classList.add('selected');
    box.classList.add(gamePiece[0]);
    //Print Mark on page
    gamebox[box.classList.item(1)].innerText=gamePiece[0]; 
    //check for any winning combination
    patternsX.push(parseInt(box.classList.item(1))+1);
    //console.log(patternsX);
    patternsX.sort();
    console.log('out of func:'+patternsX);
    findCombos=checkCombinations(patternsX,3);
    console.log(JSON.stringify(findCombos));
    console.log('only 2nd element'+findCombos[2]);
    win=findWin(findCombos,winningCombinations);
    if(win==1){
      console.log('He won');
    }
    
}

function checkCombinations(xStreak,r){
    let result=[];
    let data=[];
    let index=0;
    //console.log('xStreak:'+xStreak);
    for(let i=0;i<xStreak.length-r+1;i++){
      //console.log('results'+result);
      //console.log('i'+xStreak[i]);
      result.push(xStreak[i]);
      //console.log('result after push i:'+result);
      for(let j=i+1;j<xStreak.length-r+2;j++){
        result.push(xStreak[j]);
        //console.log('result after j push:'+result);
        for(let k=j+1;k<xStreak.length-r+3;k++){
            result.push(xStreak[k]);
            //console.log('result after k push:'+result);
            data[index]=result.concat();
            result.splice(2,result.length);
            //console.log('data[0]:'+ data[0]);
            //console.log('data[1]'+data[1]);
            //console.log('data[2]'+data[2]);
            //console.log('data:'+index+':=> '+data[index]);
            index++;

        }
        result.splice(1,result.length);
      }      
        result.splice(0,result.length);
    }
     
    return (data); 
}

function findWin(checkArray,fixArray){
  //checkArray.join("");
  //console.log(resArray);
  //console.log('checkarray:'+checkArray[0]);
  let r=[];
  for(let a=0;a<checkArray.length;a++){
    for(let b=0;b<fixArray.length;b++){
      r=checkArray[a].join("");

      console.log('deft:'+r);
      console.log('res array:'+fixArray);
      if(fixArray[b]==r){
        console.log('if loop works');
        return true;
      }
    }
  }
  return false;
}

newgamebtn.addEventListener('click', gameBoard);
gamecontainer.addEventListener('click',addMark);
