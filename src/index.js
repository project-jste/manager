const commandLineArgs = require('../node_modules/command-line-args');
const os = require('os');
const shell = require('../node_modules/shelljs');
const fs = require('fs');
const path = require('path');
const express = require('../node_modules/express');
const staticGzip = require('../node_modules/http-static-gzip-regexp');
const cors = require('../node_modules/cors');
const XMLHttpRequest = require('../node_modules/xmlhttprequest').XMLHttpRequest;
const bodyParser = require('../node_modules/body-parser');
const getFileSize = require('../node_modules/remote-file-size');
const AppDirectory = require('../node_modules/appdirectory');
const cors_proxy = require('../node_modules/cors-anywhere');
const app = express();
const device = require('../node_modules/express-device');
const favicon = require('../node_modules/serve-favicon');
app.use(device.capture());
app.use(cors());
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
app.use(bodyParser.json({
	limit: '50mb',
	type: 'application/json'
}));
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
const JsonDB = require('../node_modules/node-json-db');
const dirs = new AppDirectory({
	appName: "JsteManager",
	appAuthor: "JsteTeam",
	appVersion: "v1.0.0"
});
const appConfigDir = dirs.userConfig();
const managerConfigDB = new JsonDB(appConfigDir + "/managerConfigDB", true, false);
const dataURLsDB = new JsonDB(appConfigDir + "/dataURLsDB", true, false);
const currentPlatform = os.platform();
const currentArch = os.arch();
const root = path.join(__dirname, 'assets');
const binPath = process.execPath;
const optionDefinitions = [{
	name: 'install',
	alias: 'i',
	type: Boolean
}];
const options = commandLineArgs(optionDefinitions);
if (options.install) {
	console.log("");
	console.log("");
	console.log("");
	console.log(" Installing Jste Manager for " + currentPlatform + " " + currentArch);
	console.log("");
	console.log("");
	console.log("");
	console.log(" Copying Jste Files ");
	if (currentPlatform == 'linux') {
		shell.cp('-R', 'JsteManager', '/etc/init.d/');
		console.log("");
		console.log("");
		console.log("");
		console.log(" Registering Jste Manager script to init.d ");
		shell.chmod('ugo+x', '/etc/init.d/JsteManager');
		shell.exec('update-rc.d JsteManager defaults');
		console.log("");
		console.log("");
		console.log("");
		console.log(" Launching Jste Manager ");
		shell.exec('/etc/init.d/JsteManager &');
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("================================================");
		console.log(" Jste Manager has been installed successfuly ;) ");
		console.log("================================================");
		console.log("");
	} else if (currentPlatform == 'freebsd') {
		shell.cp('-R', 'JsteManager', '/etc/init.d/');
		console.log("");
		console.log("");
		console.log("");
		console.log(" Registering Jste Manager script to init.d ");
		shell.chmod('ugo+x', '/etc/init.d/JsteManager');
		shell.exec('update-rc.d JsteManager defaults');
		console.log("");
		console.log("");
		console.log("");
		console.log(" Launching Jste Manager ");
		shell.exec('/etc/init.d/JsteManager &');
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("================================================");
		console.log(" Jste Manager has been installed successfuly ;) ");
		console.log("================================================");
		console.log("");
	} else if (currentPlatform == 'win32') {
		shell.cp('-R', 'JsteManager.exe', '/ProgramData/Microsoft/Windows/Start Menu/Programs/StartUp');
		console.log("");
		console.log("");
		console.log("");
		console.log(" Launching Jste Manager ");
		shell.exec('start "" "/ProgramData/Microsoft/Windows/Start Menu/Programs/Startup/JsteManager.exe"');
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("================================================");
		console.log(" Jste Manager has been installed successfuly ;) ");
		console.log("================================================");
		console.log("");
	}
} else {
	app.use(staticGzip(/(naturalScript\.min\.js)$/));
	app.use(express.static(root));
	var server = app.listen(5050);
	app.post('/setAdminPassword', function (req, res) {
		if (managerConfigDB.getData('/').adminPassword) {
			if (managerConfigDB.getData('/').adminPassword == req.body.oldPassword) {
				managerConfigDB.push('/', {
					adminPassword: req.body.newPassword
				}, false);
				res.send('The admin password has been set successfuly ;)');
			} else {
				res.send('Authentication failed :(');
			}
		} else {
			managerConfigDB.push('/', {
				adminPassword: req.body.newPassword
			}, false);
			res.send('The admin password has been set successfuly ;)');
		}
	});
	app.post('/childModeActivate', function (req, res) {
		if (req.body.adminPassword && req.body.adminPassword == managerConfigDB.getData('/').adminPassword) {
			managerConfigDB.push('/', {
				childMode: 'on'
			}, false);
			res.send('Child mode has been activated successfuly ;)');
		} else {
			res.send('Authentication failed :(');
		}
	});
	app.post('/childModeDeactivate', function (req, res) {
		if (req.body.adminPassword && req.body.adminPassword == managerConfigDB.getData('/').adminPassword) {
			managerConfigDB.push('/', {
				childMode: 'off'
			}, false);
			res.send('Child mode has been deactivated successfuly ;)');
		} else {
			res.send('Authentication failed :(');
		}
	});
	app.get('/childModeStatus', function (req, res) {
		res.send(managerConfigDB.getData('/').childMode);
	});
	app.get('/adminPasswordStatus', function (req, res) {
		if (managerConfigDB.getData('/').adminPassword) {
			res.send('set');
		} else {
			res.send('not set');
		}
	});
	app.post('/nudityDetectionActivate', function (req, res) {
		if (req.body.adminPassword && req.body.adminPassword == managerConfigDB.getData('/').adminPassword) {
			managerConfigDB.push('/', {
				nudityDetection: 'on'
			}, false);
			res.send('Child mode has been activated successfuly ;)');
		} else {
			res.send('Authentication failed :(');
		}
	});
	app.post('/nudityDetectionDeactivate', function (req, res) {
		if (req.body.adminPassword && req.body.adminPassword == managerConfigDB.getData('/').adminPassword) {
			managerConfigDB.push('/', {
				nudityDetection: 'off'
			}, false);
			res.send('Child mode has been deactivated successfuly ;)');
		} else {
			res.send('Authentication failed :(');
		}
	});
	app.get('/nudityDetectionStatus', function (req, res) {
		res.send(managerConfigDB.getData('/').nudityDetection);
	});
	app.get('/adminPasswordStatus', function (req, res) {
		if (managerConfigDB.getData('/').adminPassword) {
			res.send('set');
		} else {
			res.send('not set');
		}
	});
	app.post('/adminPasswordVerification', function (req, res) {
		if (managerConfigDB.getData('/').adminPassword == req.body.adminPassword) {
			res.send('You have been logged in successfuly ;)');
		} else {
			res.send('Authentication failed :(');
		}
	});
	app.post('/verifyDataURL', function (req, res) {
		if (dataURLsDB.getData('/')[req.body.URLID]) {
			res.send('exists');
		} else {
			res.send('not exist');
		}
	});
	app.post('/getDataURL', function (req, res) {
		res.send(dataURLsDB.getData('/')[req.body.URLID]);
	});
	app.post('/insertDataURL', function (req, res) {
		dataURLsDB.push('/', {
			[req.body.URLID]: req.body.dataURL
		}, false);
		res.send('The data URL has been saved successfuly ;)');
	});
	app.post('/getFileSize', function (req, res) {
		getFileSize(req.body.fileURL, function (err, o) {
			res.send(String(o));
		});
	});
	app.get('/deviceForm', function (req, res) {
		res.send(req.device.type);
	});
	app.post('/autoCorrect', function (req, res) {
		var request = new XMLHttpRequest();
		request.open('POST', 'https://jste-manager.herokuapp.com/autoCorrect');
		request.setRequestHeader('Content-Type', 'application/json');
		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				res.send(this.responseText);
			}
		};
		var body = {
			'lang': req.body.lang,
			'input': req.body.input
		};
		request.send(JSON.stringify(body));
	});
	app.post('/getVideoInfo', function (req, res) {
		var request = new XMLHttpRequest();
		request.open('POST', 'https://loadercdn.io/api/v1/create');
		request.setRequestHeader('Content-Type', 'application/json');
		request.onreadystatechange = function () {
			if (this.readyState === 4) {
				res.send(this.responseText);
			}
		};
		var body = {
			'key': 'EatRoyUhJZVyhfI2V4dUNuwiDrTooY6T7fG5bQw',
			'link': req.body.url
		};
		request.send(JSON.stringify(body));
	});
	var localAddress = '0.0.0.0' || 'localhost';
	cors_proxy.createServer({
		originWhitelist: [], // Allow all origins
		requireHeader: [],
		setHeaders: {
			"Access-Control-Expose-Headers": "Content-Length"
		},
		removeHeaders: ['cookie', 'cookie2']
	}).listen(6060, localAddress, function () {});
}