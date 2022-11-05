import { Message } from "discord.js";
import { Minari } from "../Minari";

interface CommandBuilderOptions {
    name: string;
    description: string;
    cooldown: number;
    aliases?: string[];
    devOnly?: boolean;
    run: (bot: Minari, msg: Message, args: string[]) => void;
}

export class CommandBuilder {
    public name: CommandBuilderOptions["name"];
    public description: CommandBuilderOptions["description"];
    public cooldown: CommandBuilderOptions["cooldown"];
    public aliases: CommandBuilderOptions["aliases"];
    public devOnly: CommandBuilderOptions["devOnly"];
    public run: CommandBuilderOptions["run"];

    public constructor(options: CommandBuilderOptions) {
        this.name = options.name;
        this.description = options.description;
        this.cooldown = options.cooldown;
        this.aliases = options.aliases;
        this.devOnly = options.devOnly;
        this.run = options.run;
    }
}