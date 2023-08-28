import { BOT_TOKEN } from './secretVars';
const {Client} = require('discord.js'); //returns an object of discord.js and gives reference to "Client" variable
const client = new Client(); 
const token = BOT_TOKEN

client.login(token); //connects to Discord, and my bot... 