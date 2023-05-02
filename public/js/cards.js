function upvote(id) {
  data = {
    codeid: id,
  };
  fetch("blogs/upvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
function downvote(id) {
  data = {
    codeid: id,
  };
  fetch("blogs/downvote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
