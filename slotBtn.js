
function sleep(msec) {
    return new Promise(function(resolve) {
          setTimeout(function() {resolve()}, msec);
    })
}
    
var stopped01 = false; // キャンセルフラグ
var stopped02 = false; // キャンセルフラグ
var stopped03 = false; // キャンセルフラグ
    
var output01 =7;
var output02 =7;
var output03 =7;

let isClicked = false; //連続押し防止用
/*
async function clickedStartBtn() {
    if(!stopped01){
        shuffleSlotNumber(target01);
    }
    if(!stopped02){
        shuffleSlotNumber(target02);
    }
    if(!stopped03){
        shuffleSlotNumber(target03);
    }
}
*/
    
async function clickedStartBtn(button) {
        
    console.log('処理開始');
    button.disabled = true; // 処理中はボタンを無効化
        
    stopped01 = false;
    stopped02 = false;
    stopped03 = false;
        
    for(var i=0; true; ++i){
        if(i == 10){
            i=0;
        }
            
        if(!stopped01){
            document.querySelector('#slotNum01').innerText = i;
        }
        if(!stopped02){
            document.querySelector('#slotNum02').innerText = i;
        }
        if(!stopped03){
            document.querySelector('#slotNum03').innerText = i;
        }
        await sleep(250); // 0.1秒待機
            
        if(stopped01 && stopped02 && stopped03){
            output01 = document.querySelector('#slotNum01').innerText;
            output02 = document.querySelector('#slotNum02').innerText;
            output03 = document.querySelector('#slotNum03').innerText;
            break;
        }
    }
    
    console.log("result" + output01 + output02 + output03)
    if((output01==output02)&&(output02==output03)&&(output01==output03)){
        alert("大当たり");
    }
    
    button.disabled = false;
    console.log('処理終了');
         
}
     
async function clickedStopBtn(button) {
    if(isClicked){
        return;
    }
        
    isClicked = true;
        
    button.disabled = true; // 処理中はボタンを無効化
        
    if(stopped01 == false){
        stopped01 =true;
    }
    else if(stopped02 == false){
        stopped02 = true;
    }
    else if(stopped03 == false){
        stopped03 = true;
    }
    await sleep(500);//ボタンの連続押し防止
        
    setTimeout(() => {
        button.disabled = false;
        isClicked = false;
        }, 1000); // 1秒後にボタンを再度有効化
}

const shuffleSlotNumber = (target) => {
  //０−９までをカウントし続ける
  const targetNum = Number(9)
    
  let counterData = null
  const speed = 150
  let initNum = 0

  const countUp = () => {
    if (Number.isInteger(targetNum)) {
      target.innerHTML = initNum
    } else {
      target.innerHTML = `${initNum}.${Math.floor(Math.random() * 9)}`
    }

    initNum++

    if (initNum > targetNum) {
      initNum = 0
      target.innerHTML = initNum
    }
  }
  
  counterData = setInterval(countUp, speed)
}

const shuffleNumberCounter = (target) => {
  
  const targetNum = Number(9)//9までカウントアップ
    
  if (!targetNum) {
    return
  }

  let counterData = null
  const speed = 70
  let initNum = 0

  const countUp = () => {
    if (Number.isInteger(targetNum)) {
      target.innerHTML = initNum
    } else {
      target.innerHTML = `${initNum}.${Math.floor(Math.random() * 9)}`
    }

    initNum++

    if (initNum > targetNum) {
      target.innerHTML = targetNum
      clearInterval(counterData)
    }
  }
  
  counterData = setInterval(countUp, speed)
}

const target01 = document.querySelector('#slotNum01');
const target02 = document.querySelector('#slotNum02');
const target03 = document.querySelector('#slotNum03');

shuffleNumberCounter(target01)
shuffleNumberCounter(target02)
shuffleNumberCounter(target03)

let startbutton = document.getElementById('Btnstart');
let stopbutton = document.getElementById('Btnstop');

// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
startbutton.addEventListener('click', clickedStartBtn);
stopbutton.addEventListener('click', clickedStopBtn);
