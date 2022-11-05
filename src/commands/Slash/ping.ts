import { SlashBuilder } from "../../structures";

export default new SlashBuilder()
.setName("ping")
.setDescription("Muestra el ping del bot.")
.setCallback(async ({ bot, interaction }) => {
    try {
        return interaction.reply(`Pong! ${bot.ws.ping}ms`);
    } catch (err) {
        console.error(err);
    }
});