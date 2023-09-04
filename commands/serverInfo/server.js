const {SlashCommandBuilder, Guild} = require('discord.js');

const server = new Guild(); 

module.exports = {
    data: new SlashCommandBuilder().setName('numberOfPeopleHere')
    .setDescription('returns information about how many people in server'),
    async execute(interaction){
        await interaction.reply(`This server has ${interaction.guild.memberCount} different people you can bother!`);
    }
}

