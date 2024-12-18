const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// clock
const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("#alarmBtn");

let alarmTime, isAlarmSet = false,
ringtone = new Audio("./img/alarmtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;    //condition ? expression_if_true : expression_if_false  (ternary operator)
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;    //condition ? expression_if_true : expression_if_false  (ternary operator)
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" :"PM";    //condition ? expression_if_true : expression_if_false  (ternary operator)
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

//setInterval(() => { }, 1000) defines a JavaScript interval timer that repeatedly executes a given function after a specified amount of time.
// setInterval(callback, delay) :- delay: The time delay (in milliseconds) between each execution of the callback.
setInterval(() => {
    // getting hours, mins,secs
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12){
        h = h - 12;
        ampm = "PM"
    }
    // if hours value is 0, set value to 12
    h = h == 0 ? 12 : h;
    // adding 0 before hrs, min, sec if thi value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play()
        ringtone.loop = true;
    }

});

function setAlarm() {  
    if (isAlarmSet) {   //if alarm is true
        alarmTime = "";  //clear the ringtone
        ringtone.pause();   //pause the ringtone
        content.classList.remove('disable');
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;  //return isAlarmSet value to false
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm"); 
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add('disable');
    setAlarmBtn.innerText = "Clear Alarm";
    
}
setAlarmBtn.addEventListener('click', setAlarm);

// ----------To -Do list-------
function addTask() {
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span")
        span.innerHTML ="\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData()
}
listContainer.addEventListener ("click", function (e){
    console.log(e.target.tagName)
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

// for storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();