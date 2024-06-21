let animationElements = document.querySelectorAll(".anim")
let windowHeight = window.innerHeight
let pointOfReveal = 50
function showElements() {
    for (let i = 0; i < animationElements.length; i++) {
        let animationElementsTop = animationElements[i].getBoundingClientRect().top

        if (animationElementsTop < windowHeight - pointOfReveal) {
            animationElements[i].classList.add("active")
        } else {
            animationElements[i].classList.remove("active")
        }
        
    }
}
window.addEventListener("scroll", ()=>{
    showElements()
})

let allBlogVideos = document.querySelectorAll(".blog-vids")
let allSections = document.querySelectorAll("section")

for (let i = 0; i < allBlogVideos.length; i++) {
    allBlogVideos[i].addEventListener("mouseover", ()=>{
        allBlogVideos[i].play()
    })
    allBlogVideos[i].addEventListener("mouseleave", ()=>{
        allBlogVideos[i].pause()
    })
    
}

let joinBtn = document.querySelector(".join-btn")
let joinPopUp = document.querySelector(".join-pop-up")
let closeJoinPopUpIcon = document.querySelector(".close-join-window")
joinBtn.addEventListener("click", ()=>{
    joinPopUp.classList.add("active")
})
closeJoinPopUpIcon.addEventListener("click", ()=>{
    joinPopUp.classList.remove("active")
})

let menuToggleBtns = document.querySelectorAll(".mobile-menu-toggle")
let mobileMenu = document.querySelector(".mobile-menu")

for (let i = 0; i < menuToggleBtns.length; i++) {
    menuToggleBtns[i].addEventListener("click", ()=>{
        mobileMenu.classList.toggle("active")
    })
    
}


//BMI Calculator

let weightField = document.getElementById("weight");
let heightField = document.getElementById("height");
let kgRadio = document.getElementById("kg");
let lbRadio = document.getElementById("lb");
let metersRadio = document.getElementById("meters");
let inchesRadio = document.getElementById("inches");
let calculateBtn = document.getElementById("calc-btn");
const result = document.getElementById("result");
const resultInsight = document.getElementById("result-insights")

lbRadio.addEventListener("input", () => {
    let weightInKg = parseFloat(weightField.value);
    if (!isNaN(weightInKg)) {
        weightField.value = (weightInKg * 2.205).toFixed(2); // Converting to pounds
    }
    kgRadio.checked = false;
});

inchesRadio.addEventListener("input", () => {
    let heightInMeters = parseFloat(heightField.value);
    if (!isNaN(heightInMeters)) {
        heightField.value = (heightInMeters * 39.37).toFixed(2); // Converting to inches
    }
    metersRadio.checked = false;
});

calculateBtn.addEventListener("click", () => {
    let weight = parseFloat(weightField.value);
    let height = parseFloat(heightField.value);

    if (isNaN(weight) || isNaN(height) || height === 0) {
        result.textContent = "Please enter valid numbers for weight and height.";
        return;
    }

    let answer;

    if (lbRadio.checked) {
        // If weight is in pounds and height in inches, we use BMI formula for imperial units
        answer = (weight / Math.pow(height, 2)) * 703;
    } else {
        // Use metric formula
        answer = weight / Math.pow(height, 2);
    }

    let roundedNumber = Math.round(answer * 10) / 10;

    result.textContent = "Your BMI: " + roundedNumber;
    if (roundedNumber < 18.4) {
        resultInsight.textContent = "Status: Underweight"
    }else if(roundedNumber > 18.5 && roundedNumber < 24.9){
        resultInsight.textContent = "Status: Normal"
    }else if(roundedNumber>24.5 && roundedNumber < 39.9){
        resultInsight.textContent = "Status: Overweight"
    }else if(roundedNumber > 40.0){
        resultInsight.textContent = "Status: Obese"
    }
    console.log("Weight:", weight, "Height:", height, "BMI:", roundedNumber);
});

