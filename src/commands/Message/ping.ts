import { BaseGuildTextChannel, DiscordAPIError } from "discord.js";
import Type from "../../Minari";
import { CommandBuilder } from "../../structures";

export default new CommandBuilder({
    name: "ping",
    description: "Muestra el ping del bot.",
    cooldown: 3,
    async run(bot, msg) {
        try {
            return msg.reply(`Pong! ${bot.ws.ping}ms`);
        } catch (err) {
            bot.error("Hubo un error al intentar ejecutar este comando.", { name: this.name, type: Type.Command, channel: msg.channel as BaseGuildTextChannel, error: err as Error | DiscordAPIError });
        }
    }
});