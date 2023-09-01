const { BOT_TOKEN } = require("./secretVars");
const { Client, GatewayIntentBits } = require("discord.js"); //returns an object of discord.js and gives reference to "Client" variable
const ronBot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const token = BOT_TOKEN;

//json for the joke api
//[
// {
//     "error": boolean,
//     "category": string,
//     "type": string,
//     "setup": string,
//     "delivery": string,
//     "flags": {
//         "nsfw": boolean,
//         "religious": boolean,
//         "political": boolean,
//         "racist": boolean,
//         "sexist": boolean,
//         "explicit": boolean
//     },
//     "id": num,
//     "safe": boolean,
//     "lang": "en"
//  }
//]

//json for the fact api
// [
//     {
//       "fact": string
//     }
// ]

const greetingsArr = [
  "Hey there! Whats up ",
  "ew go away, i'm busy...doing other things...fine what do u want ",
  "I am Ron? what do u want ",
  "go bother Kal or Atharve nvm what do u want ",
  "what ",
  "whats up ",
  "ew its ",
];

const commandsObj = {
  "joke": "insults whoever asked for it (20% chance), or makes an original joke fetched from the joke API",
  "kanye quote": "returns a random quote from kanye using the rest API",
  "fun fact": "returns a random fun fact",
};

ronBot.login(token); //connects to Discord, and my bot...


