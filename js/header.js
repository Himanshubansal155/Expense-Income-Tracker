// document.body.onload = addElement;
// const currentDiv = document.getElementById("navbar-btn");

// function addElement() {
//   const newDiv = document.createElement("div");
//   // newDiv.innerHTML =
//   //   '<ul class="nav" id="myTab" role="tablist"><li class="nav-item" role="presentation"><button class="nav-link active border-top-0 border-start-0 border-end-0 border-primary bg-light mr-3" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab"aria-controls="home"aria-selected="true">Home</button></li><li class="nav-item" role="presentation"><button class="nav-link  border-top-0 border-start-0 border-end-0 border-primary bg-light mr-3" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button></li><li class="nav-item" role="presentation"><button class="nav-link text-secondary border-top-0 border-start-0 border-end-0 border-primary bg-light mr-3" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button></li></ul>';
//   // currentDiv.appendChild(newDiv);
//   // currentDiv.className += "d-flex";
// }

// if (currentDiv.className.indexOf("active") > 0) {
//   console.log("found");
// }

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
