import { BaseGuildTextChannel, Client, Collection, DiscordAPIError, EmbedBuilder, WebhookClient } from "discord.js";
import { CommandHandler, EventHandler, SlashHandler } from "./handlers";
import type { CommandBuilder, SlashBuilder } from "./structures";

enum Type {
    Command = 1,
    Event = 2
}

interface ErrorDataOptions {
    name: string;
    type: Type;
    channel: BaseGuildTextChannel | WebhookClient;
    error: Error | DiscordAPIError;
}

export class Minari extends Client {
    public constructor() {
        super({ intents: 33293, allowedMentions: { repliedUser: false } });
    }

    public commands = new Collection<string, CommandBuilder>();
    public slash = new Collection<string, SlashBuilder>();
    public aliases = new Collection<string, string>();
    public logs = new WebhookClient({ id: process.env.HOOK_ID!, token: process.env.HOOK_TOKEN! });

    public start(): void {
        CommandHandler(this);
        EventHandler(this);
        SlashHandler(this);
        this.login(process.env.BOT_TOKEN);
    }

    public error(message: string, data: ErrorDataOptions): void {
        const errorEmbed = new EmbedBuilder();
        errorEmbed.setDescription(`\`\`\`\n${data.error}\n\`\`\``);

        switch (data.type) {
            case Type.Command:
                errorEmbed.setTitle(`Comando: ${data.name}`);
                data.channel.send(`:x: ${message}`);
            break;
            case Type.Event:
                errorEmbed.setTitle(`Evento: ${data.name}`);
            break;
        }

        this.logs.send({ embeds: [errorEmbed] });
        console.error(data.error);
    }
}

export default Type