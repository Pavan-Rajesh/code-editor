const registerButton = document.getElementById("register");
registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/register";
});
