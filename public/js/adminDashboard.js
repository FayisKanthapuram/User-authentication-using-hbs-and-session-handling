function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};
const message = document.getElementById("message").value;
if (message === "User already exist") {
  Swal.fire({
    icon: "error",
    title: "Error!",
    text: message,
    confirmButtonColor: "#ff2c2c", // Sets a custom red color
  });
} else if (message) {
  Swal.fire({
    title: message,
    icon: "success",
    draggable: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  //DOMContentLoaded ensures that all HTML elements are fully loaded before we try to access them
  document.getElementById("add-user").addEventListener("submit", formValidate);

  searchUser();
});

function formValidate(e) {
  e.preventDefault(); //Stops the form from submitting immediately.
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var username = document.getElementById("username").value;
  if (
    email == "" ||
    password == "" ||
    confirmPassword == "" ||
    username == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "All fields are required.",
      confirmButtonColor: "#ff2c2c", // Sets a custom red color
    });

    return false;
  } else if (password != confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Password do not match.",
      confirmButtonColor: "#ff2c2c", // Sets a custom red color
    });
    return false;
  }
  e.target.submit(); //If validation passes → e.target.submit(); manually submits the form.
  return true;
}

function searchUser() {
  const filter = document.getElementById('userSearch').value.trim().toLowerCase();
  const rows = document.querySelectorAll('#userTable tbody tr');
  let index = 1; // start index from 1

  rows.forEach(row => {
    const usernameCell = row.querySelector('td:nth-child(2)');
    const username = usernameCell ? usernameCell.textContent.trim().toLowerCase() : '';

    const emailCell = row.querySelector('td:nth-child(3)');
    const email = emailCell ? emailCell.textContent.trim().toLowerCase() : '';

    if (username.startsWith(filter) || email.startsWith(filter)) {
      row.style.display = 'table-row';
      row.querySelector('td:nth-child(1)').textContent = index; // update index column
      index++;
    } else {
      row.style.display = 'none';
    }
  });
}
