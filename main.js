const path = require('path')
const url = require('url')
const { app, BrowserWindow, Menu } = require('electron')

let mainWindow;
let formWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        icon: __dirname + "/img/icon.png",
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', () => {
        app.quit()
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.show()
}

function addFormWindow() {
    formWindow = new BrowserWindow({
        width: 500,
        height: 400,
        icon: __dirname + "/img/form.png",
        webPreferences: {
            nodeIntegration: false
        }
    });
    formWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'form.html'),
        protocol: 'file:',
        slashes: true
    }));
    formWindow.on('closed', () => {
        formWindow = null;
    });
    formWindow.show()
}

const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: `Quit`,
        click() {
            app.quit()
        }
    }]
}, {
    label: 'Form',
    click() {
        addFormWindow()
    }
}]

// Ad developer tools
if (process.env.NODE_ENV !== 'production') {
    let devTools = {
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle DevTools',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: 'reload'
        }]
    }
    mainMenuTemplate.push(devTools)
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    app.quit()
})