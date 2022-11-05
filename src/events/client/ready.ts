import { DiscordAPIError } from "discord.js";
import Type from "../../Minari";
import { EventBuilder } from "../../structures";

export default new EventBuilder({
    name: "ready",
    once: true,
    async run(bot) {
        try {
            await bot.application?.fetch();
            console.log(`${bot.user?.tag} ha iniciado a Discord.`);
        } catch (err) {
            bot.error("Error en evento", { name: this.name, type: Type.Event, channel: bot.logs, error: err as Error | DiscordAPIError });
        }
    }
});