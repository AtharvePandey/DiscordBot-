const { SlashCommandBuilder } = require("discord.js");

module.exports = { //other files should be able to read the commands 
    data: new SlashCommandBuilder().setName('joke')
    .setDescription('20% chance of roasting the user, else makes a joke'),
    async execute(interaction){
        await interaction.reply(getJoke());
    }
}

function getJoke(){
    fetch('https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit').then(data => {
        data.json().then(json => {
            if(json.type == "twopart"){
                let string = json.setup +  '\n' + json.delivery; 
                return string;
            }else{
                let string = json.getJoke;
                return string; 
            }
        })
    });
}