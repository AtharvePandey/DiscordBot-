const { BOT_TOKEN } = require("./secretVars");
const { Client, Message, SlashCommandBuilder } = require("discord.js"); //returns an object of discord.js and gives reference to "Client" variable
const ronBot = new Client();
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
  //for debugging purposes...
  console.log("logged in, and connected to the API!");
});

ronBot.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(ronBot.user.id)) {
    //case where the bot was mentioned
    //generate a reply message with the possible commands given

    const greeting =
      greetingsArr[Math.floor(Math.random() * greetingsArr.length)] +
      message.author.id +
      "? \n";
    greeting = greeting.concat("Here is what I can do: " + "\n");
    greeting += commandsObj;

    message.reply(greeting).then((val) => {
      if (val) {
        //successfull reply
        ronBot.on("messageCreate", (message) => {
          if (message.content.includes("joke")) {
            //user has requested a joke
            //generate a random number between 1 and 5, so theres a 20% chance user gets insulted when asked for a joke
            let num = Math.floor(Math.random() * (5 - 1) + 1);
            if (num == 1) {
              //small chance the request invokes the bot to roast the user
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
            fetch("https://api.api-ninjas.com/v1/facts?limit=1").then(
              (data) => {
                data.json().then((json) => {
                  message.reply(json.fact);
                });
              }
            );
          }
        });
      } else {
        message.reply(
          "Atharve made a small bug in the code, you shouldn't be reading this line at all, so someone tell him to quit being so bad at coding!"
        );
      }
    });
  }
});
