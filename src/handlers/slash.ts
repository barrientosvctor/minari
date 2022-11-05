import fs from "node:fs";
import { Minari } from "../Minari";
import type { SlashBuilder } from "../structures";

export const SlashHandler = (bot: Minari): void => {
    fs.readdirSync("./src/commands/Slash").filter(f => f.endsWith(".ts")).forEach(async file => {
        const { default: slash }: { default: SlashBuilder } = (await import(`../commands/Slash/${file}`));
        bot.slash.set(slash.name, slash);
    });

    bot.once("ready", () => void bot.guilds.cache.get(String(process.env.SERVER))?.commands.set(bot.slash.map(slash => slash.toJSON())).catch(err => console.error(err)));
}