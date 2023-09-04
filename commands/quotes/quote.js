const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('Kanye quote')
    .setDescription('returns a random quote by Kanye'),
    async execute(interaction){
        await interaction.reply(getQuote());
    }
}

function getQuote(){
    let string = "Here is a random quote by Kanye West: + \n";

    fetch('https://api.kanye.rest').then(data => {
        data.json().then(json => {
            string.concat(json.quote);
        })
    });
    return string; 
}