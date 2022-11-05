import fs from "node:fs";
import { Minari } from "../Minari";
import type { CommandBuilder } from "../structures";

export const CommandHandler = (bot: Minari): void => {
    fs.readdirSync("./src/commands/Message").filter(f => f.endsWith(".ts")).forEach(async file => {
        const command: CommandBuilder = (await import(`../commands/Message/${file}`)).default;
        bot.commands.set(command.name, command);
    });
}