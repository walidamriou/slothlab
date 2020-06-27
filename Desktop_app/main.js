//var ua = require('universal-analytics');

//var visitor = ua('UA-43599500-8');


// Modules to control application life and create native browser window
const {app, shell, BrowserWindow} = require('electron')




const nativeImage = require('electron').nativeImage;
    var image = nativeImage.createFromPath(__dirname + '/img/project_logo.png'); 
    image.setTemplateImage(true);
    
const path = require('path')

function createWindow () {
  // Create the browser window.
  //visitor.pageview("/").send();
  const mainWindow = new BrowserWindow({
    //width: 800, //best for linux & mac
    //height: 630, //best for linux & mac
    width: 500,
    height: 600,
    resizable: false,
    icon: image,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  //visitor.pageview("/", function (err) {
    // Handle the error if necessary.
    // In case no error is provided you can be sure
    // the request was successfully sent off to Google.
    //console.log("send to google analytics");
  //  console.log(err);
  //});

  // This is the actual solution
mainWindow.webContents.on("new-window", function(event, url) {
  event.preventDefault();
  console.log(url)
  console.log(__dirname)
  let input_url1=`file:///${__dirname}/about.html`
  console.log(input_url1)
  //url===url bacause I want to make a standard function for all url 
  if(url===url){
    const mainWindow2 = new BrowserWindow({
    width: 300,
    height: 600,
    resizable: false,
    icon: image,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }})
    // and load the index.html of the app.
    mainWindow2.loadFile('./about.html')
    mainWindow2.setMenuBarVisibility(false)
  }


  //shell.openExternal(url);
});

  //mainWindow.setMenuBarVisibility(false)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { exec } = require('child_process');

