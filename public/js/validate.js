// select all inputs that will be validated
var regForm = document.querySelector("form[name='regForm']");
var fullName = document.querySelector("#full-name");
var matrix = document.querySelector("#matrix");
var school = document.querySelector("#school");
var phone = document.querySelector("#phone");
var email = document.querySelector("#email");

//regular expressions for each field
var nameRegex = /^[a-zA-Z ]{2,30}$/; // only 1 space, b/n 2 to 30 chars
var matrixRegex = /^[A-Z0-9]{7,9}$/; // uppercase letters and digits, no spaces
var schoolRegex = /^[a-zA-Z ]{2,50}$/; // same as name but longer
var phoneRegex = /^\d{6,15}$/; // digits only
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// validation flag
var flag = 0;

// register the event listener callbacks

fullName.addEventListener("focusout", validateName);
matrix.addEventListener("input", () => matrix.value = matrix.value.toUpperCase());
matrix.addEventListener("focusout", validateMatrix);
school.addEventListener("focusout", validateSchool);

// validation functions for each field

//name
function validateName() {
  // validate presence of value and length
  if (fullName.value.length < 2 || fullName.value.length > 30) {
    fullName.previousElementSibling.innerHTML = "*This field cannot be empty (2 to 30 characters long)";
    fullName.style = "border: red 2px solid";
    flag = 1;
    return;
  } else {
    fullName.previousElementSibling.innerHTML = "";
    fullName.style = "border: green 2px solid";
    flag = 0;
  }

  // validate value against pattern
  if (!nameRegex.test(fullName.value)) {
    fullName.previousElementSibling.innerHTML = "*This field is invalid (no digits allowed, only letters)";
    fullName.style = "border: red 2px solid";
    flag = 1;
  } else {
    fullName.previousElementSibling.innerHTML = "";
    fullName.style = "border: green 2px solid";
    flag = 0;
  } 
}

function validateMatrix() {
  if (matrix.value.length < 7 || matrix.value.length > 9) {
    matrix.previousElementSibling.innerHTML = "*This field cannot be empty (7 to 9 characters long)";
    matrix.style = "border: red 2px solid";
    flag = 1;
    return;
  } else {
    matrix.previousElementSibling.innerHTML = "";
    matrix.style = "border: green 2px solid";
    flag = 0;
  } 

  if (!matrixRegex.test(matrix.value)) {
    matrix.previousElementSibling.innerHTML = "*This field is invalid (only digits and letters with no spaces)";
    matrix.style = "border: red 2px solid";
    flag = 1;
  } else {
    matrix.previousElementSibling.innerHTML = "";
    matrix.style = "border: green 2px solid";
    flag = 0;
  } 
}

function validateSchool() {
  if (school.value.length < 2 || school.value.length > 50) {
    school.previousElementSibling.innerHTML = "*This field cannot be empty (2 to 50 characters long)";
    school.style = "border: red 2px solid";
    flag = 1;
    return;
  } else {
    school.previousElementSibling.innerHTML = "";
    school.style = "border: green 2px solid";
    flag = 0;
  } 

  if (!schoolRegex.test(school.value)) {
    school.previousElementSibling.innerHTML = "*This field is invalid (only digits and letters with no spaces)";
    school.style = "border: red 2px solid";
    flag = 1;
  } else {
    school.previousElementSibling.innerHTML = "";
    school.style = "border: green 2px solid";
    flag = 0;
  } 
}
