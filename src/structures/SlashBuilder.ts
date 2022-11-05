import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import type { Minari } from "../Minari";

export class SlashBuilder extends SlashCommandBuilder {
    public callback!: CommandFunction;

    public setCallback(fn: CommandFunction) {
        this.callback = fn;
        return this;
    }
}

type CommandFunction = (idk: { bot: Minari, interaction: ChatInputCommandInteraction }) => unknown;