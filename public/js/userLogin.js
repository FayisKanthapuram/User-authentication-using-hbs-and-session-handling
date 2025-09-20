function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.style.fill = "#000"; // dark when visible
  } else {
    input.type = "password";
    el.style.fill = "#555"; // lighter when hidden
  }
}
const message = document.getElementById("message").value;
if (message==="User Created Successfully") {
  Swal.fire({
    title: message,
    icon: "success",
    draggable: true
  });
}else if(message){
  Swal.fire ({
    icon: "error",
    title: "Error!",
    text: message,
    confirmButtonColor: "#ff2c2c", // Sets a custom red color
  });
}

document.addEventListener("DOMContentLoaded", function () {
  //DOMContentLoaded ensures that all HTML elements are fully loaded before we try to access them
  document.querySelector("form").addEventListener("submit", formValidate);
});
function formValidate(e) {
  e.preventDefault(); //Stops the form from submitting immediately.
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email == "" || password == "" ) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "All fields are required.",
      confirmButtonColor: "#ff2c2c", // Sets a custom red color
    });

    return false;
  }
  e.target.submit(); //If validation passes → e.target.submit(); manually submits the form.
  return true;
}