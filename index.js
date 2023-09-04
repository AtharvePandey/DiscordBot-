const fs = require('node:fs'); //used to read filesystems (the commands file)
const path = require('node:path'); //this is to help construct files and directories
const { BOT_TOKEN } = require("./secretVars"); //private variable for 
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js"); //returns an object of discord.js and gives reference to "Client" variable

const ronBot = new Client({
  intents: [GatewayIntentBits.Guilds]
});
const token = BOT_TOKEN;
ronBot.commands = new Collection(); 

//the following is code from the web which establishes my files in the commands folder...
const commandsPath = path.join(__dirname, 'commands'); //tells to look for the commands folder i made
const commandFiles = fs.readdirSync(commandsPath).filter(file => {
  file.endsWith('.js');
}); // get only js files from the path specified and store them in an array

for(const file of commandFiles){ //iterate throught he array obj
   const filePath = path.join(commandsPath, file);
   const command = require(filePath); 

   if('data' in command && 'excecute' in command){
      ronBot.commands.set(command.data.name,command);
   }else{
      console.log('error lol, tell Atharve to code better');
   }
}

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

ronBot.once(Events.ClientReady, rb => { //debugging step, ensures that the robot is ready and in the server
  console.log(`Ready, logged in as ${rb.user.tag}`); 
});

ronBot.login(token); //this step connects to the bot, so that the bot can run properly

ronBot.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand()){
    return;
  }else{
    const command = interaction.client.commands.get(interaction.commandName); 
    if(!command){
      console.error('No command found');
      return;
    }else{
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error); 
      }
    }
  }
})

