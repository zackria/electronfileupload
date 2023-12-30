const { dialog } = require("electron");
const path = require("path");
const fs = require("fs");
module.exports = {
  fileRequest: global.share.ipcMain.on("file-request", (event) => {
    // If the platform is 'win32' or 'Linux'
    if (process.platform !== "darwin") {
      // Resolves to a Promise<Object>
      dialog
        .showOpenDialog({
          title: "Select the File to be uploaded",
          defaultPath: path.join(__dirname, "//assets/"),
          buttonLabel: "Upload",
          // Restricting the user to only Text Files.
          filters: [
            {
              name: "Text Files",
              extensions: ["txt", "docx"],
            },
          ],
          // Specifying the File Selector Property
          properties: ["openFile"],
        })
        .then((file) => {
          // Stating whether dialog operation was
          // cancelled or not.
          console.log(file.canceled);
          if (!file.canceled) {
            const filepath = file.filePaths[0].toString();
            console.log(filepath);
            event.reply("file", filepath);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If the platform is 'darwin' (macOS)
      dialog
        .showOpenDialog({
          title: "Select the File to be uploaded",
          defaultPath: path.join(__dirname, "//assets/"),
          buttonLabel: "Upload",
          filters: [
            {
              name: "Text Files",
              extensions: ["txt", "docx"],
            },
          ],
          // Specifying the File Selector and Directory
          // Selector Property In macOS
          properties: ["openFile", "openDirectory"],
        })
        .then((file) => {
          console.log(file.canceled);
          if (!file.canceled) {
            const filepath = file.filePaths[0].toString();
            console.log(filepath);
            event.sender.send("file", filepath);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }),
};
