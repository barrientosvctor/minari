import { SlashBuilder } from "../../structures";

export default new SlashBuilder()
.setName("cat")
.setDescription("Gatos lindos!")
.setCallback(async ({ bot, interaction }) => {
    try {
        const data = await fetch("https://api.thecatapi.com/v1/images/search").then(res => res.json());
        return interaction.reply(`${data[0].url}`);
    } catch (err) {
        console.error(err);
    }
});