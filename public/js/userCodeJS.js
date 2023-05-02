function changeCode(code) {
  // console.log(code.getAttribute("data-id"));
  const data = { codeId: code.getAttribute("data-id") };
  window.location.href = `/edit?id=${code.getAttribute(
    "data-id"
  )}&language=${code.getAttribute("data-language")}`;
}

function deleteCode(code) {
  console.log("delter clicked");
  const data = { codeId: code.getAttribute("data-id") };
  fetch(
    `/delete?id=${code.getAttribute("data-id")}&language=${code.getAttribute(
      "data-language"
    )}`,
    {
      method: "DELETE",
    }
  )
    .then((msg) => msg.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    });
}
