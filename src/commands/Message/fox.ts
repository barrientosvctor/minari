import { BaseGuildTextChannel, DiscordAPIError } from "discord.js";
import Type from "../../Minari";
import { CommandBuilder } from "../../structures";

export default new CommandBuilder({
    name: "fox",
    description: "Muestra imagenes de zorros.",
    cooldown: 3,
    async run(bot, msg) {
        try {
            const data = await fetch("https://randomfox.ca/floof/").then(res => res.json());
            return msg.reply(`${data.image}`);
        } catch (err) {
            bot.error("Hubo un error al intentar ejecutar el comando.", { name: this.name, type: Type.Command, channel: msg.channel as BaseGuildTextChannel, error: err as Error | DiscordAPIError });
        }
    }
});