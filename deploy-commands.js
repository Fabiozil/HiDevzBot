const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const commands = [];
try {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }
    console.log(`Commands loaded successfully! ${commands}`);
} catch (err) {
    console.error(`Error loading commands to deploy. ${err}`);
    throw new Error(err);
}

try {
    const rest = new REST({ version: "10" }).setToken(
        process.env.DISCORD_TOKEN
    );

    rest.put(
        Routes.applicationGuildCommands(
            process.env.APP_ID,
            process.env.GUILD_ID
        ),
        {
            body: commands,
        }
    )
        .then((data) =>
            console.log(
                `Successfully registered ${data.length} application commands.`
            )
        )
        .catch(console.error);
} catch (err) {
    console.error(`Error writing commands. ${err}`);
    throw new Error(err);
}
