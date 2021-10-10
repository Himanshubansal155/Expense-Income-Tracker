function onTabClick(tab) {
  if (tab === 0) {
    document.getElementById("content-heading").innerHTML =
      "<b>LOGIN</b> YOUR PROFILE <br /><small>This information will let us know more aboutyou.</small>";
  } else {
    document.getElementById("content-heading").innerHTML =
      "<b>REGISTER</b> YOUR PROFILE <br /><small>This information will let us know more aboutyou.</small>";
  }
  return true;
}

let emailLoginValidate = false;
let passwordLoginValidate = false;
let nameSignUpValidate = false;
let emailSignUpValidate = false;
let passwordSignUpValidate = false;

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function onLoginChange(e) {
  if (e.name === "email") {
    if (validateEmail(e.value)) {
      emailLoginValidate = true;
      document.getElementById("emailError").innerHTML = "";
      if (document.forms["loginForm"]["password"].value !== "") {
        document.getElementById("passwordError").innerHTML = "";
        passwordLoginValidate = true;
      }
    } else {
      if (e.value === "") {
        document.getElementById("emailError").innerHTML = "Please enter email";
      } else {
        document.getElementById("emailError").innerHTML =
          "Please enter valid email";
      }
      emailLoginValidate = false;
    }
  } else if (e.name === "password") {
    if (e.value !== "" && e.value.length > 4) {
      passwordLoginValidate = true;
      document.getElementById("passwordError").innerHTML = "";
      if (validateEmail(document.forms["loginForm"]["email"].value)) {
        document.getElementById("emailError").innerHTML = "";
        emailLoginValidate = true;
      }
    } else {
      passwordLoginValidate = false;
      if (e.value === "") {
        document.getElementById("passwordError").innerHTML =
          "Please enter password";
      } else {
        document.getElementById("passwordError").innerHTML =
          "Password length greater than 5";
      }
    }
  }
  if (emailLoginValidate && passwordLoginValidate) {
    document.getElementById("login").disabled = false;
  } else {
    document.getElementById("login").disabled = true;
  }
}

function onSignupChange(e) {
  if (e.name === "email") {
    if (validateEmail(e.value)) {
      emailSignUpValidate = true;
      document.getElementById("emailSignError").innerHTML = "";
      if (document.forms["loginForm"]["password"].value !== "") {
        passwordSignUpValidate = true;
        document.getElementById("passwordSignError").innerHTML = "";
      }
      if (document.forms["loginForm"]["name"].value !== "") {
        nameSignUpValidate = true;
        document.getElementById("nameSignError").innerHTML = "";
      }
    } else {
      emailSignUpValidate = false;
      if (e.value === "") {
        document.getElementById("emailSignError").innerHTML =
          "Please enter email";
      } else {
        document.getElementById("emailSignError").innerHTML =
          "Please enter valid email";
      }
    }
  } else if (e.name === "password") {
    if (e.value !== "" && e.value.length > 4) {
      passwordSignUpValidate = true;
      document.getElementById("passwordSignError").innerHTML = "";
      if (validateEmail(document.forms["loginForm"]["email"].value)) {
        emailSignUpValidate = true;
        document.getElementById("emailSignError").innerHTML = "";
      }
      if (document.forms["loginForm"]["name"].value !== "") {
        nameSignUpValidate = true;
        document.getElementById("nameSignError").innerHTML = "";
      }
    } else {
      passwordSignUpValidate = false;
      if (e.value === "") {
        document.getElementById("passwordSignError").innerHTML =
          "Please enter password";
      } else {
        document.getElementById("passwordSignError").innerHTML =
          "Password length greater than 5";
      }
    }
  } else if (e.name === "name") {
    if (e.value !== "" && e.value.length > 2) {
      nameSignUpValidate = true;
      if (validateEmail(document.forms["loginForm"]["email"].value)) {
        emailSignUpValidate = true;
        document.getElementById("emailSignError").innerHTML = "";
      }
      if (document.forms["loginForm"]["password"].value !== "") {
        passwordSignUpValidate = true;
        document.getElementById("passwordSignError").innerHTML = "";
      }
    } else {
      if (e.value === "") {
        document.getElementById("nameSignError").innerHTML =
          "Please Enter Name";
      } else {
        document.getElementById("nameSignError").innerHTML =
          "Name must have 3 letters";
      }
      nameSignUpValidate = false;
    }
  }
  if (emailSignUpValidate && passwordSignUpValidate && nameSignUpValidate) {
    document.getElementById("register").disabled = false;
  } else {
    document.getElementById("register").disabled = true;
  }
}
