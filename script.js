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
    //console.log('out of func:'+patternsX);
    findCombos=checkCombinations(patternsX,3);
    //console.log(JSON.stringify(findCombos));
    //console.log('only 2nd element'+findCombos[2]);
    win=findWin(findCombos,winningCombinations);
    if(win==1){
      console.log('He won');
    }
    
    cOptions=compTurn();
    compThink(cOptions);

    
}

function compTurn(){
    let compTrn=[]; 
    gamebox.forEach((ck)=>{
     
      if(!ck.classList.contains('selected')){
        //console.log(ck.classList.item(1));
        compTrn.push(parseInt(ck.classList.item(1))+1);
        

      }
    });
    console.log('compTurn:'+compTrn);  
    return compTrn;
  
  }

  function compThink(options){
    let xMatch=[];
    let cCombos=[];   
    let newxMatch=[];  
      gamebox.forEach((tm)=>{
        if(tm.classList.contains('X')){
          xMatch.push(parseInt(tm.classList.item(1))+1);
          xMatch.sort();
                   
        }
      });
  
      console.log('xMatch:'+xMatch);
      for(let a=0;a<options.length;a++){
         xMatch.push(parseInt(options[a]));
         let newxMatch=xMatch;
        // console.log('new xMatch:'+xMatch);
         cCombos=checkCombinations(newxMatch,3);
        // console.log("ccombos:"+cCombos);
         //console.log("combos1:"+cCombos[1]);
         cresult=findWin(cCombos,winningCombinations);
         console.log("cresult:"+cresult+'at option:'+options[a]);
         if(cresult==true){
           gamebox.forEach((bt)=>{
             console.log('bt item:'+bt.classList.item(1));
             im=parseInt(bt.classList.item(1))+1;
             console.log(im);
             if((parseInt(bt.classList.item(1))+1)==options[a]){
               gamebox[bt.classList.item(1)].innerText=gamePiece[1];
             }

           });
         }
      //console.log("xmatch before splice:"+xMatch);
      xMatch=xMatch.filter((tl)=>{
         return (tl!=options[a]);
      });
      //console.log("xmatch after filter:"+xMatch);
      }
        
  }

function checkCombinations(xStreak,r){
    let result=[];
    let data=[];
    let index=0;
    xStreak.sort();
    for(let i=0;i<xStreak.length-r+1;i++){
      result.push(xStreak[i]);
      for(let j=i+1;j<xStreak.length-r+2;j++){
        result.push(xStreak[j]);
        for(let k=j+1;k<xStreak.length-r+3;k++){
            result.push(xStreak[k]);
            data[index]=result.concat();
            result.splice(2,result.length);
            index++;

        }
        result.splice(1,result.length);
      }      
        result.splice(0,result.length);
    }
     return (data); 
}

function findWin(checkArray,fixArray){
  let r=[];
  
  for(let a=0;a<checkArray.length;a++){
    for(let b=0;b<fixArray.length;b++){
      r=checkArray[a].join("");
       if(fixArray[b]==r){
        //console.log('if loop works');
        return true;
      }
    }
  }
  return false;
}

newgamebtn.addEventListener('click', gameBoard);
gamecontainer.addEventListener('click',addMark);
