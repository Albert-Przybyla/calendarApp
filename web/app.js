const { app, BrowserWindow } = require("electron");

let appWindow;

const createWindow = () => {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });
  appWindow.loadFile("dist/web/browser/index.html");

  appWindow.on("closed", () => {
    appWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();
});
