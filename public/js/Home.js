const editor = document.getElementById("editor");
const blog = document.getElementById("blog");
const viewMyCodes = document.getElementById("viewmycodes");
const signUpButton = document.getElementById("signup");

editor.addEventListener("click", (e) => {
  window.location.href = "/letscode";
});
blog.addEventListener("click", (e) => {
  window.location.href = "";
});

viewMyCodes.addEventListener("click", (e) => {
  window.location.href = "/usercodes";
});

signUpButton.addEventListener("click", (e) => {
  const emailValue = document.getElementById("email").value;
  const x = {
    email: emailValue,
  };
  fetch("/addemail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(x),
  });
});
