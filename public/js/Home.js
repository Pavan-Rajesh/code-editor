const editor = document.getElementById("editor");
const blog = document.getElementById("blog");
const viewMyCodes = document.getElementById("viewmycodes");
editor.addEventListener("click", (e) => {
  window.location.href = "/letscode";
});
blog.addEventListener("click", (e) => {
  window.location.href = "";
});

viewMyCodes.addEventListener("click", (e) => {
  window.location.href = "/usercodes";
});
