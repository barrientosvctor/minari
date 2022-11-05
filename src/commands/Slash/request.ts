import { EmbedBuilder } from "discord.js";
import { SlashBuilder } from "../../structures";

export default new SlashBuilder()
.setName("request")
.setDescription("Solicita la implementación de tu bot al servidor.")
.addStringOption(opt => opt.setName("id").setDescription("Ingresa la ID de tu bot aquí, asegúrate de que tu bot sea público.").setRequired(true))
.addStringOption(opt => opt.setName("description").setDescription("Cuéntanos un poco acerca de tu bot.").setRequired(true))
.setCallback(async ({ bot, interaction }) => {
    try {
        const idField: string = interaction.options.getString("id")!
        const descriptionField: string = interaction.options.getString("description")!

        if (!Number(idField) || idField.length !== 18) return interaction.reply({ content: "La ID debe tener 18 números.", ephemeral: true });
        if (descriptionField.length < 20) return interaction.reply({ content: "Cuéntanos más acerca de tu bot", ephemeral: true });

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("¡Ha llegado una nueva solicitud!")
        .setDescription(`ID de su Bot: \`${idField}\`\nDescripción de su bot: \`\`\`\n${descriptionField}\n\`\`\``)
        .addFields({ name: "Invitación", value: `Una vez que hayas hablado con los staffs y quieran aceptar al bot en el servidor [pulsa aquí para invitar al bot :)](https://discord.com/api/oauth2/authorize?client_id=${idField}&permissions=0&scope=bot%20applications.commands)` })
        .setFooter({ text: `Enviado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 2048, extension: "png" }) });

        bot.logs.send({ embeds: [embed] }).then(() => {
            return interaction.reply(`Solicitud enviada!`);
        }).catch(err => {
            console.error(err);
            return interaction.reply("Hubo un error interno al intentar enviar tu solicitud");
        });
    } catch (err) {
        console.error(err);
    }
});