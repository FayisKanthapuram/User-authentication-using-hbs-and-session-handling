const message = document.getElementById("message").value;
if (message) {
  Swal.fire({
    title: message,
    icon: "success",
    draggable: true
  });
}