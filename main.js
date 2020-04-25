console.log("working");

const electron =  require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
let win;

function createWindow(){
    win = new BrowserWindow();
    win.setAutoHideMenuBar(true);
    win.webContents.openDevTools()
    win.loadURL(url.format({
        pathname: path.join(__dirname,'exp.html'),
        protocol: 'file',
        slashes: true   
    }));
          
}

app.on('ready',createWindow);

app.on('window-all-closed', function(e){
    
    if(process.platform != 'darwin'){
         app.quit()
    }
    
});

app.on('activate', ()=>{
    if(win == null){
        createWindow()
    }
}); 


