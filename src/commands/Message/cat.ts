import { BaseGuildTextChannel, DiscordAPIError } from "discord.js";
import Type from "../../Minari";
import { CommandBuilder } from "../../structures";

export default new CommandBuilder({
    name: "cat",
    description: "Muestra imagenes de gatitos.",
    cooldown: 3,
    async run(bot, msg) {
        try {
            const data = await fetch("https://api.thecatapi.com/v1/images/search").then(res => res.json());
            return msg.reply(`${data[0].url}`);
        } catch (err) {
            bot.error("Hubo un error al mostrar la imagen de un gato.", { name: this.name, type: Type.Command, channel: msg.channel as BaseGuildTextChannel, error: err as Error | DiscordAPIError });
        }
    }
});