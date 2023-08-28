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

ronBot.on("ready", () => {
  //this is a small step that tells me the bot is live in the discord server
  //for debugging purposes...
  console.log("logged in, and connected to the API!");
});

let pinged = false; //this is to keep track of if we want to excecute the second event listener (should only excecute after we ping the bot!!!)

ronBot.once("messageCreate", (message) => {
  //whenever a message is sent to the group...note the once is so that the eventlistener only works on ping, and not every time...
  if (message.author.bot) {
    return;
  }

  if (message.mentions.has(ronBot.user.id)) {
    //if the bot is pinged, then display the greeting
    // Display greeting and commands
    let greeting = greetingsArr[Math.floor(Math.random() * greetingsArr.length)] + message.author.username + "? \n";
    greeting = greeting.concat("Here is what I can do: " + "\n\n");
    Object.entries(commandsObj).forEach(([key, value]) => {
      //the entries method returns an array of the key value pairs
      greeting += `${key}: ${value}\n\n`; //we just take the key and value and concat it to the greeting string
    });
    pinged = true;
    message.reply(greeting); //reply to the user who has pinged with our greeting
  }
});

//since above listener only excecutes once, we can use another listener for response handling...

ronBot.once("messageCreate", (message) => {
  if (pinged) {
    if (message.content.includes("joke")) {
      let num = Math.floor(Math.random() * 5) + 1;
      if (num === 1) {
        message.reply("you're the joke lol");
      } else {
        //now we call the api
        fetch("https://v2.jokeapi.dev/joke/Any").then((data) => {
          data.json().then((json) => {
            if (json.type == "twopart") {
              const joke = json.setup + "\n" + json.delivery;
              message.reply(joke);
            } else {
              message.reply(json.joke);
            }
          });
        });
      }
    } else if (message.content.includes("kanye")) {
      fetch("https://api.kanye.rest").then((val) => {
        //using the kanye rest api
        val.json().then((str) => {
          message.reply("here is a quote by kanye: " + str.quote);
        });
      });
    } else if (message.content.includes("fact")) {
      fetch("https://api.api-ninjas.com/v1/facts?limit=1").then((data) => {
        data.json().then((json) => {
          message.reply(json.fact);
        });
      });
    }
  }
  pinged = false;
});
