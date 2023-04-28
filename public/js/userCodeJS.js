function changeCode(code) {
  console.log(code.getAttribute("data-id"));
  const data = { codeId: code.getAttribute("data-id") };
  window.location.href = `/edit?id=${code.getAttribute("data-id")}`;
}
