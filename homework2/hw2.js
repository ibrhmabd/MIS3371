/*
    Name: Muhammad Abdurahman
    Date created: June 20, 2025
    Date last edited: June 20, 2025 
    Version: 2
    Description: Homework 2 JS 
*/


const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;

let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

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

function validateSsn() {
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

function validateZcode() {
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

function validatePword(pword, uid) {
  const errorMessage = [];

  if (!pword.match(/[a-z]/)) {
    errorMessage.push("Enter at least one lowercase letter");
  }
  if (!pword.match(/[A-Z]/)) {
    errorMessage.push("Enter at least one uppercase letter");
  }
  if (!pword.match(/[0-9]/)) {
    errorMessage.push("Enter at least one number");
  }
  if (!pword.match(/[!\@#\$%&*\-_\\.+\(\)]/)) {
    errorMessage.push("Enter at least one special character");
  }
  if (pword.includes(uid)) {
    errorMessage.push("Password can't contain user ID");
  }

  for (let i = 1; i <= 4; i++) {
    document.getElementById("msg" + i).textContent = errorMessage[i - 1] || "";
  }
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
    const isSsnValid = validateSsn();
    const isUidValid = validateUid();
    const isZipValid = validateZcode();
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