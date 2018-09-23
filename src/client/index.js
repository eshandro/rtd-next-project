import React from "react";
import ReactDOM from "react-dom";
import App from './containers/app';

import {Db, Server} from 'mongodb';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = new Db('rtdNextTrain', new Server('localhost', 8080));

db.open()
	.then(() => {
		window.db = db;
		mongoose.connect('mongodb://localhost/rtdNextTrain');
		mongoose.connection
			.once('open', () => { 
				console.log('successful connection to db in src/index.js');
				ReactDOM.render(<App />, document.getElementById("react-app"))

			})
			.on('error', (error) => {
				console.warn('Error in DB connection in src/index.js', error);
			});
		
	});


