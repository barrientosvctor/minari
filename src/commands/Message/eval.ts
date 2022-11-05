import { CommandBuilder } from "../../structures";
import { inspect } from "node:util";
import { EmbedBuilder } from "discord.js";

export default new CommandBuilder({
    name: "eval",
    description: "Ejecuta código.",
    cooldown: 3,
    async run(bot, msg, args) {
        if (!args[1]) return msg.reply("Escribe el código que vas a ejecutar.");

        let result;
        try {
            result = await eval(args.slice(1).join(" "));
        } catch (error) {
            result = error;
        }

        const embed = new EmbedBuilder()
        .setTitle("Código evaluado")
        .setDescription(`**Tipo:** ${typeof result}\n\n**Salida:**\n\`\`\`js\n${inspect(result, { depth: 0 })}\`\`\``)
        .setColor("Random");

        return msg.reply({ embeds: [embed] });
    }
});