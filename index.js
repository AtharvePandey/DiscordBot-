import { BOT_TOKEN } from './secretVars';
const {Client, Message} = require('discord.js'); //returns an object of discord.js and gives reference to "Client" variable
const ronBot = new Client(); 
const token = BOT_TOKEN

ronBot.login(token); //connects to Discord, and my bot...


