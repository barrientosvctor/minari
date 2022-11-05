import fs from "node:fs";
import { Minari } from "../Minari";
import type { EventBuilder } from "../structures";

export const EventHandler = (bot: Minari): void => {
    fs.readdirSync("./src/events").forEach(folder => {
        fs.readdirSync(`./src/events/${folder}`).filter(f => f.endsWith(".ts")).forEach(async file => {
            const event: EventBuilder = (await import(`../events/${folder}/${file}`)).default;

            if (event.once) bot.once(event.name, event.run.bind(null, bot));
            else bot.on(event.name, event.run.bind(null, bot));
        });
    });
}