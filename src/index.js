const electron = require("electron");
const { dialog } = electron; // electron.remote; (if in renderer process)
const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

const UPLOAD_BTN = document.getElementById("upload");
const SAVE_BTN = document.getElementById("save");

UPLOAD_BTN.addEventListener("click", () => {
  ipcRenderer.send("file-request");
});

SAVE_BTN.addEventListener("click", () => {
  ipcRenderer.send("save-request", "Data from UI");
});

//upon receiving a file, process accordingly
ipcRenderer.on("file", (event, file) => {
  console.log("obtained file from main process: " + file);

  fs.readFile(file, { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      console.log("received data: " + data);
    } else {
      console.log(err);
    }
  });
});

//upon receiving a file, process accordingly
ipcRenderer.on("save", (event, file) => {
  console.log("obtained file from main process: " + file);

  fs.readFile(file, { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      console.log("received data: " + data);
    } else {
      console.log(err);
    }
  });
});
