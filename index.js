import { BOT_TOKEN } from './secretVars';
const {Client, Message, SlashCommandBuilder} = require('discord.js'); //returns an object of discord.js and gives reference to "Client" variable
const ronBot = new Client(); 
const token = BOT_TOKEN

const greetingsArr = [
    "Hey there! Whats up ",
    "ew go away, i'm busy...doing other things...fine what do u want ",
    "I am Ron? what do u want ",
    "go bother Kal or Atharve, nvm what do u want ",
    "what ",
    "whats up ",
    "ew its "
]

const commandsObj = {
    "joke": "insults whoever asked for it",
    "kanye quote": "returns a random quote from kanye using the rest API",
    "song-reccomendations": "calls the song rec API and returns a random song"
}

ronBot.login(token); //connects to Discord, and my bot...

ronBot.on('ready', () => { //for debugging purposes...
    console.log("logged in, and connected to the API!"); 
});

ronBot.on('messageCreate', message =>{
    if(message.author.bot)return;

    if(message.mentions.has(ronBot.user.id)){ //case where the bot was mentioned
        //generate a reply message with the possible commands given

        const greeting = greetingsArr[Math.floor(Math.random() * greetingsArr.length)] + message.author.id + '? \n';
        greeting = greeting.concat("Here is what I can do: " + '\n');
        greeting += commandsObj;

        message.reply(greeting).then(val => {
            if(val){ //successfull reply
                ronBot.on('messageCreate', message => {
                    if(message.content.includes("joke")){ //user has requested a joke
                        message.reply("you are the joke lol!");
                    }else if(message.content.includes("kanye")){
                        fetch("https://api.kanye.rest").then(val => { //using the kanye rest api
                            val.json().then(str => {
                                message.reply("here is a quote by kanye: " + str.quote);
                            })
                        })
                    }else if(message.content.includes("song")){ //using the spotify api
                        
                    }
                })
            }
        })

    }

})

