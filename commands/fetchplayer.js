const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fetch_player")
        .setDescription("Replies with player summary")
        .addStringOption((option) =>
            option
                .setName("player_name")
                .setDescription("Player name")
                .setRequired(true)
                .addChoices(
                    { name: "Apu", value: "AmWolfWereHuman" },
                    { name: "Derp", value: "Derp" }
                )
        ),
    async execute(interaction) {
        const playerName = interaction.options.getString("player_name");
        await interaction.reply(
            `Fetched player: ${playerName}\nWin Rate: 0.5%\nTop Gods: \n 1. Ganesha. Worshippers: 4350. Win Rate: 70%\n 2.Awilix. Worshippers: 2500. Win Rate: -60%`
        );
    },
};
