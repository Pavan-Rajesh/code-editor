const aceLanguage = "ace/mode/";
const aceTheme = "ace/theme/";
//requiring the buttons for setting the editor
const settings = document.getElementById("settings-toggler");
const settingsOpener = document.getElementById("settings");
const configure = document.getElementById("configure");
const theme = document.getElementById("theme");
const language = document.getElementById("language");
const fontSize = document.getElementById("font-size");
const compile = document.getElementById("compile");
const output = document.getElementById("output");
const save = document.getElementById("save");
const programName = document.getElementById("codeName");
const markedText = document.getElementById("markdown-text");
const markdownArea = document.getElementById("markdown");
const outputMarkdownArea = document.getElementById("output-markdown");
//adding the event listeners to the setting
settings.addEventListener("click", function (e) {
  if (settingsOpener.style.display == "none") {
    settingsOpener.style.display = "block";
  } else {
    settingsOpener.style.display = "none";
  }
});

const editor = ace.edit("editor");
editor.setFontSize(15);
editor.setOptions({
  enableBasicAutocompletion: true,
});
editor.setTheme(`${aceTheme}` + "chaos");
//configuring the editor with the user needs
configure.addEventListener("click", (e) => {
  // console.log(theme.value);
  // console.log(language.value);
  editor.setTheme(`${aceTheme}` + theme.value);
  editor.session.setMode(`${aceLanguage}` + language.value);
  // console.log(fontSize.value);
  editor.setFontSize(parseInt(fontSize.value));
  settingsOpener.style.display = "none";
});
// compilation
language.addEventListener("change", (e) => {
  editor.session.setMode(`${aceLanguage}` + e.target.value);
});

compile.addEventListener("click", (e) => {
  const usercode = editor.getSession().getValue();
  const x = {
    code: usercode,
    language: language.value,
  };
  output.innerHTML = "<h2>Compiling</h2>";
  console.log(JSON.stringify(x));
  //----------------------------------------------------------------
  fetch("/letscode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(x),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data.output);
      output.innerHTML = data.output;
    });
});

save.addEventListener("click", (e) => {
  const usercode = editor.getSession().getValue();
  const x = {
    code: usercode,
    language: language.value,
    markdown: markedText.value,
    codeName: programName.value,
  };
  const url = window.location.href;
  const requrl = url.split("/");
  console.log(requrl[requrl.length - 1]);
  if (requrl[requrl.length - 1] == "letscode") {
    fetch("/letscode/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(x),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  } else {
    console.log(`/${requrl[requrl.length - 1]}`);
    fetch(`/${requrl[requrl.length - 1]}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(x),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  }
});

const logOutButton = document.getElementById("logout");
logOutButton.addEventListener("click", (e) => {
  window.location.href = "/logout";
});

markedText.addEventListener("input", (e) => {
  // console.log("writing");
  write();
});

function write() {
  outputMarkdownArea.innerHTML = "";
  const html = marked.parse(markedText.value);
  outputMarkdownArea.innerHTML = html;
}

if (window.location.pathname == "/view") {
  editor.setReadOnly(true);
  markedText.setAttribute("readonly", "true");
  write();
}

if (window.location.pathname == "/edit") {
  write();
}
