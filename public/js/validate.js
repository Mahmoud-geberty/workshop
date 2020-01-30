// select all inputs that will be validated
var regForm = document.querySelector("form[name='regForm']");
var fullName = document.querySelector("#full-name");
var matrix = document.querySelector("#matrix");
var school = document.querySelector("#school");
var phone = document.querySelector("#phone");
var email = document.querySelector("#email");

//regular expressions for each field
const nameRegex = /^[a-zA-Z ]{2,30}$/; // only 1 space, b/n 2 to 30 chars
const matrixRegex = /^[A-Z0-9]{7,9}$/; // uppercase letters and digits, no spaces
const schoolRegex = /^[a-zA-Z ]{2,50}$/; // same as name but longer
const phoneRegex = /^\d{6,15}$/; // digits only
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// validation flag
var flag = 1;

// register the event listener callbacks

fullName.addEventListener("focusout", () =>
  validate(fullName, nameRegex, [2, 30], "(no digits allowed, only letters)")
);
matrix.addEventListener(
  "input",
  () => (matrix.value = matrix.value.toUpperCase())
);
matrix.addEventListener("focusout", () =>
  validate(
    matrix,
    matrixRegex,
    [7, 9],
    "(only digits and letters with no spaces)"
  )
);
school.addEventListener("focusout", () =>
  validate(school, schoolRegex, [2, 50], "(no digits allowed, only letters)")
);
phone.addEventListener("focusout", () =>
  validate(phone, phoneRegex, [6, 15], "(digits only, no letters or symbols)")
);
email.addEventListener("focusout", () =>
  validate(email, emailRegex, null, "(please provide a valid email address)")
);

// validation function

function validate(element, regex, range, invalidMsg) {
  // validate presence of value and length
  if (range) {
    var min = range[0];
    var max = range[1];

    if (element.value.length < min || element.value.length > max) {
      element.previousElementSibling.innerHTML = `*This field cannot be empty (${min} to ${max} characters long)`;
      element.style = "border: red 2px solid; color: red;";
      flag = 1;
      return false;
    } else {
      element.previousElementSibling.innerHTML = "";
      element.style = "border: #05aa05 2px solid; color: #05aa05;";
      flag = 0;
    }
  } else {
    if (element.value.length < 1) {
      element.previousElementSibling.innerHTML = `*This field cannot be empty`;
      element.style = "border: red 2px solid; color: red;";
      flag = 1;
      return false;
    } else {
      element.previousElementSibling.innerHTML = "";
      element.style = "border: #05aa05 2px solid; color: #05aa05;";
      flag = 0;
    }
  }

  // validate value against pattern
  if (!regex.test(element.value)) {
    element.previousElementSibling.innerHTML = `*This field is invalid ${invalidMsg}`;
    element.style = "border: red 2px solid; color: red";
    flag = 1;
  } else {
    element.previousElementSibling.innerHTML = "";
    element.style = "border: #05aa05 2px solid; color: #05aa05;";
    flag = 0;
    return true;
  }
}

// One final validation before submitting the form

// set arrays of fields and their validations props
const elements = [fullName, matrix, school, phone, email];
const patterns = [nameRegex, matrixRegex, schoolRegex, phoneRegex, emailRegex];
const ranges = [[2, 30], [7, 9], [2, 50], [6, 15], null];
const messages = [
  "(no digits allowed, only letters)",
  "(only digits and letters with no spaces)",
  "(no digits allowed, only letters)",
  "(digits only, no letters or symbols)",
  "(please provide a valid email address)"
];

// validate each elements until the first invalid one
// only submit if everything is valid
regForm.addEventListener("submit", (e) => {
  if (flag) {
    elements.forEach((element, i) => {
      validate(element, patterns[i], ranges[i], messages[i]);
    });
    alert("submit failed, please make sure all fields are valid");
    e.preventDefault();
  }
});
