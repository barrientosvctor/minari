import { SlashBuilder } from "../../structures";

export default new SlashBuilder()
.setName("fox")
.setDescription("Muestra imagenes de zorros")
.setCallback(async ({ bot, interaction }) => {
    try {
        const data = await fetch("https://randomfox.ca/floof/").then(res => res.json());
        return interaction.reply(`${data.image}`);
    } catch (err) {
        console.error(err);
    }
});