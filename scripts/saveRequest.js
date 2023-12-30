const { dialog } = require("electron");
const path = require("path");
const fs = require("fs");
module.exports = {
  saveRequest: global.share.ipcMain.on("save-request", (event, arguments) => {
    // If the platform is 'win32' or 'Linux'
    if (process.platform !== "darwin") {
      // Resolves to a Promise<Object>
      dialog
        .showSaveDialog({
          title: "Select the File to be uploaded",
          defaultPath: path.join(__dirname, "//assets/"),
          buttonLabel: "Save",
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
            const filepath = file.filePath.toString();
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
        .showSaveDialog({
          title: "Select the File to be uploaded",
          defaultPath: path.join(__dirname, "//assets/"),
          buttonLabel: "Save",
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
            const filepath = file.filePath.toString();
            console.log(filepath);

            // Creating and Writing to the sample.txt file
            fs.writeFile(file.filePath.toString(), arguments, function (err) {
              if (err) throw err;
              console.log("Saved!");
              event.sender.send("save", filepath);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }),
};
