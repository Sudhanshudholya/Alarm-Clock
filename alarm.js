let allSelect = document.querySelectorAll("select");
let timeElement = document.querySelector("h1");
let setButton = document.querySelector("button");
let contentBox = document.querySelector(".content-box");
let alarmTime;
let rington= new Audio("rington.mp3");

// Run loop for hours
for (let i = 12; i > 0; i--) {
    let value = i < 10 ? "0" + i : i;
    let option = `<option value="${value}">${value}</option>`;
    allSelect[0].innerHTML += option;
}

// Run loop for minutes
for (let i = 59; i >= 0; i--) {
    let value = i < 10 ? "0" + i : i;
    let option = `<option value="${value}">${value}</option>`;
    allSelect[1].innerHTML += option;
}

// Run loop for AM/PM
["AM", "PM"].forEach(ampm => {
    let option = `<option value="${ampm}">${ampm}</option>`;
    allSelect[2].innerHTML += option;
});

// Getting hour, minute, and second
setInterval(function () {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let currentTime = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    timeElement.innerText = currentTime;

    if (alarmTime === `${hours} : ${minutes} ${ampm}`) {
        rington.play();
        rington.loop = true;
    }
}, 1000);

// Set alarm coding
const setAlarm = () => {
    let time = `${allSelect[0].value} : ${allSelect[1].value} ${allSelect[2].value}`;
    if (time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")) {
        return swal("Warning", "Please select a valid time", 'warning');
    }
    contentBox.classList.add("disabled");
    setButton.innerText = "Clear Alarm";
    alarmTime = time;
};

// Add event listener to set the alarm
setButton.addEventListener("click", () => {
    if (setButton.innerText === "Clear Alarm") {
        contentBox.classList.remove("disabled");
        setButton.innerText = "Set Alarm";
        alarmTime = null;
        ringtones.pause();
        ringtones.currentTime = 0;
    } else {
        setAlarm();
    }
});
