/*
    Name: Muhammad Abdurahman
    Date created: July 2, 2025
    Date last edited: July 2, 2025 
    Version: 1
    Description: Homework 3 JS 
*/


const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;

function updateSliderValue() {
    const slider = document.getElementById("range");
    document.getElementById("range-slider").textContent = slider.value;
  }
  
  document.getElementById("range")
    .addEventListener("input", updateSliderValue);
  
  updateSliderValue();
    
function handleReset() {
  setTimeout(updateSliderValue, 0);
}

function validateDob() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be more than 120 years ago";
        dob.value = "";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}

function validateSSN() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = 
        "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}

function formatSSN() {
    const el = document.getElementById("ssn");
    let v = el.value.replace(/\D/g, "");
    if (v.length > 3) v = v.slice(0,3) + "-" + v.slice(3);
    if (v.length > 6) v = v.slice(0,6) + "-" + v.slice(6,10);
    el.value = v;
  }
  

function validateZip() {
    const zipInput = document.getElementById("zcode");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zcode-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

    if (zip.length > 5) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else {
        zip = zip.slice(0, 5);
    }

    zipInput.value = zip;
    document.getElementById("zcode-error").innerHTML = "";
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value;
    const emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!email) {
        document.getElementById("email-error").innerHTML = 
        "Email can't be blank";
        return false;
    }

    if (!emailR.test(email)) {
        document.getElementById("email-error").innerHTML = 
        "Please enter a valid email";
        return false;
    } else {
        document.getElementById("email-error").innerHTML = "";
        return true;
    }
}

function validateAddress1() {
    const el = document.getElementById("address1");
    const val = el.value.trim();
    const err = document.getElementById("address1-error");
    if (!val) {
      err.textContent = "Address Line 1 is required";
      return false;
    }
    if (val.length < 2 || val.length > 30) {
      err.textContent = "Address must be 2–30 characters";
      return false;
    }
    err.textContent = "";
    return true;
  }
  
function validatePhone() {
    const phone = document.getElementById("phone").value;
    const phoneR = /^\d{3}-\d{3}-\d{4}$/;
    
    if (!phone) {
        document.getElementById("phone-error").innerHTML = 
        "Phone number can't be blank";
        return false;
    }

    if (!phoneR.test(phone)) {
        document.getElementById("phone-error").innerHTML = 
        "Please enter a valid phone number";
        return false;
    } else {
        document.getElementById("phone-error").innerHTML = "";
        return true;
    }
}

function validateUid() {
    uid = document.getElementById("uid").value.toLowerCase();
    document.getElementById("uid").value = uid;

    if (uid.length == 0) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't be blank";
        return false;
    }

    if (!isNaN(uid.charAt(0))) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can only have letters, numbers, underscores, and dashes";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("uid-error").innerHTML = 
        "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 30) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("uid-error").innerHTML = "";
        return true;
    }
}

function validatePword() {
    const errorMessage = [];
    const pword = document.getElementById("pword").value;
    const uid = document.getElementById("uid").value;
  
    if (!pword.match(/[a-z]/)) {
      errorMessage.push("Enter at least one lowercase letter");
    }
    if (!pword.match(/[A-Z]/)) {
      errorMessage.push("Enter at least one uppercase letter");
    }
    if (!pword.match(/[0-9]/)) {
      errorMessage.push("Enter at least one number");
    }
    if (!pword.match(/[!@#\$%&*\-_\.+\(\)]/)) {
      errorMessage.push("Enter at least one special character");
    }
    if (pword.includes(uid)) {
      errorMessage.push("Password can't contain user ID");
    }
  
    for (let i = 1; i <= 4; i++) {
      document.getElementById("msg" + i).textContent = errorMessage[i - 1] || "";
    }
    return errorMessage.length === 0;
  }
  

function confirmPword() {
    pword1 = document.getElementById("pword").value;
    pword2 = document.getElementById("pword2").value;

    if (pword1 !== pword2) {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords don't match";
        return false;
    } else {
        document.getElementById("pword2-error").innerHTML = 
        "Passwords match";
        return true;
    }
}

function reviewInput() {
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isSsnValid = validateSSN();
    const isUidValid = validateUid();
    const isZipValid = validateZip();
    const isDobValid = validateDob();
    const isPasswordsMatch = confirmPword();

    const pword = document.getElementById("pword").value;
    const uid = document.getElementById("uid").value;
    validatePword(pword, uid);

    if (!(isEmailValid && isPhoneValid && isSsnValid && isUidValid && isZipValid && isDobValid && isPasswordsMatch)) {
        document.getElementById("showInput").innerHTML = "";
        return;
    }

    const formcontent = document.getElementById("signup");
    let formoutput = "<table class='output'><th colspan='3'>Review Your Information:</th>";
    for (let i = 0; i < formcontent.length; i++) {
        const field = formcontent.elements[i];
        if (field.value !== "") {
            switch (field.type) {
                case "checkbox":
                    if (field.checked) {
                        formoutput += `<tr><td align='right'>${field.name}</td><td>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (field.checked) {
                        formoutput += `<tr><td align='right'>${field.name}</td><td>${field.value}</td></tr>`;
                    }
                    break;
                default:
                    formoutput += `<tr><td align='right'>${field.name}</td><td>${field.value}</td></tr>`;
            }
        }
    }
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}


function removeReview() {
    document.getElementById("showInput").innerHTML = "";
}

function showAlert() {
    var alertBox = document.getElementById("alert-box");
    var closeAlert = document.getElementById("close-alert");

    alertBox.style.display = "block";
    closeAlert.onclick = function() {
        alertBox.style.display = "none";
    };
}

function validateEverything() {
    let valid = true;

    if (!validateFname()) {
        valid = false;
    }
    if (!validateMini()) {
        valid = false;
    }
    if (!validateLname()) {
        valid = false;
    }
    if (!validateDob()) {
        valid = false;
    }
    if (!validateSSN()) {
        valid = false;
    }
    if (!validateAddress1()) {
        valid = false;
    }
    if (!validateCity()) {
        valid = false;
    }
    if (!validateZip()) {
        valid = false;
    }
    if (!validateEmail()) {
        valid = false;
    }
    if (!validatePhone()) {
        valid = false;
    }
    if (!validateUid()) {
        valid = false;
    }
    if (!validatePword()) {
        valid = false;
    }
    if (!confirmPword()) {
        valid = false;
    }
     if (valid) {
         document.getElementById("submit").disabled = false;
     } else{
        showAlert();
     }
    
     return valid;
 }

 function validateCity() {
    city = document.getElementById("city").value.trim();

    if (!city) {
        document.getElementById("city-error").innerHTML = "City cannot be blank";
        return false;
    } else {
        document.getElementById("city-error").innerHTML = "";
        return true;
    }
}

function validateMini() {
    let mini = document.getElementById("mini").value;
    const namePattern = /^[A-Z]+$/;

    mini = mini.toUpperCase();
    document.getElementById("mini").value = mini;

    if (!mini.match(namePattern)) {
        document.getElementById("mini-error").innerHTML = 
        "Middle initial must be a single uppercase letter";
        return false;
    } else {
        document.getElementById("mini-error").innerHTML = "";
        return true;
    }
}

function validateFname() {
    const el = document.getElementById("fname");
    let fname = el.value.trim();
    const namePattern = /^[A-Za-z'-]{1,30}$/;
  
    if (!fname) {
      document.getElementById("fname-error").innerHTML = "First name is required";
      return false;
    }
    if (!fname.match(namePattern)) {
      document.getElementById("fname-error").innerHTML =
        "First name must be 1–30 letters, apostrophes or dashes only";
      return false;
    }
    document.getElementById("fname-error").innerHTML = "";
    return true;
  }
  
  function validateLname() {
    const el = document.getElementById("lname");
    let lname = el.value.trim();
    const namePattern = /^[A-Za-z'-]{1,30}$/;
  
    if (!lname) {
      document.getElementById("lname-error").innerHTML = "Last name is required";
      return false;
    }
    if (!lname.match(namePattern)) {
      document.getElementById("lname-error").innerHTML =
        "Last name must be 1–30 letters, apostrophes or dashes only";
      return false;
    }
    document.getElementById("lname-error").innerHTML = "";
    return true;
  }

