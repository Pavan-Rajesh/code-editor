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
      updatedata(id);
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
      updatedata(id);
    });
}

function updatedata(id) {
  const data = {
    codeid: id,
  };
  const upvoteplace = document.getElementById("upvotenum" + id);
  const downvoteplace = document.getElementById("downvotenum" + id);
  fetch("/blogs/update", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      upvoteplace.innerHTML = responseData[0].upvotes;
      downvoteplace.innerHTML = responseData[0].downvotes;
    });
}
