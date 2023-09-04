const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data:
    + new SlashCommandBuilder().setName('get-Fun-Fact')
    .setDescription('returns a random fun fact'),
    async execute (interaction){
        await interaction.reply(getFunFact());
    }
}

function getFunFact(){
    fetch('https://api.api-ninjas.com/v1/facts?limit=1').then(data => {
        data.json().then(json => {
            return json.fact.toString(); 
        })
    })
}