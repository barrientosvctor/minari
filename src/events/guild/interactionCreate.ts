import { ChatInputCommandInteraction, DiscordAPIError } from "discord.js";
import Type from "../../Minari";
import { EventBuilder, SlashBuilder } from "../../structures";

export default new EventBuilder({
    name: "interactionCreate",
    async run(bot, interaction: ChatInputCommandInteraction<"cached">) {
        try {
            const slashCommand: SlashBuilder | undefined = bot.slash.get(interaction.commandName);
            if (!slashCommand) return;

            const runCommandFunction = (): void => {
                try {
                    slashCommand.callback({ bot, interaction });
                } catch (error) {
                    console.error(error);
                }
            }

            if (interaction.isChatInputCommand()) runCommandFunction();
        } catch (err) {
            bot.error("Hubo un error en el evento.", { name: this.name, type: Type.Event, channel: bot.logs, error: err as Error | DiscordAPIError });
        }
    }
});