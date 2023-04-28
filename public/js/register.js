const loginButton = document.getElementById("login");
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/login";
});
