import { Collection, DiscordAPIError, Message } from "discord.js";
import Type from "../../Minari";
import { CommandBuilder, EventBuilder } from "../../structures";
const Cooldown = new Map();

export default new EventBuilder({
    name: "messageCreate",
    async run(bot, msg: Message) {
        try {
            const prefix: string = "m!";
            const args: Array<string> = msg.content.substring(prefix.length).split(" ");
            const command: CommandBuilder | undefined = bot.commands.get(args[0]!) || bot.commands.get(bot.aliases.get(args[0]!) as string);

            if (!args[0] || msg.author.bot || !msg.guild || !msg.content.startsWith(prefix)) return;

            if (command) {
                // Dev check
                if (command.devOnly && ![bot.application?.owner?.id].includes(msg.author.id)) return;

                // Cooldown
                if (command.cooldown) {
                    if (!Cooldown.has(command.name)) Cooldown.set(command.name, new Collection());
                
                    const time_stamps = Cooldown.get(command.name);
                    const cooldown_amount = (command.cooldown) * 1000;

                    if (time_stamps.has(msg.author.id)) {
                        const expiration_time = time_stamps.get(msg.author.id) + cooldown_amount;

                        if (Date.now() < expiration_time) {
                            const time_left = (expiration_time - Date.now()) / 1000
                            return msg.reply(`Espera! Necesitas esperar ${time_left < 1 ? 'unos segundos más' : time_left === 1 ? '*1 segundo*' : time_left >= 2 ? `*${time_left.toFixed(0)} segundos*` : `*${time_left.toFixed(0)} segundos*`} para volver a usar el comando **${command.name}**.`).then(m => setTimeout(() => m.delete(), cooldown_amount)).catch(() => {});
                        }
                    }
                    time_stamps.set(msg.author.id, Date.now());
                    setTimeout(() => time_stamps.delete(msg.author.id), cooldown_amount);
                }

                try {
                    command.run(bot, msg, args);
                } catch (err) {
                    console.error(err);
                }
            } else return;
        } catch (err) {
            bot.error("Hubo un error en el evento.", { name: this.name, type: Type.Event, channel: bot.logs, error: err as Error | DiscordAPIError });
        }
    }
});