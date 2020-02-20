const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
  });

  win.loadFile('index.html');
  win.setMenu(null);
});
