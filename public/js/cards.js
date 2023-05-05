function upvote(id) {
  console.log("clicked upvote");
  data = {
    codeid: id,
  };
  fetch("blogs/upvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
function downvote(id) {
  console.log("clicked downvote");
  data = {
    codeid: id,
  };
  fetch("blogs/downvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
