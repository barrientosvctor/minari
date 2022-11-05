import { Minari } from "../Minari";
import { ClientEvents } from "discord.js";

interface EventBuilderOptions {
    name: keyof ClientEvents;
    once?: boolean;
    run: (bot: Minari, ...args: any[]) => void;
}

export class EventBuilder {
    public name: EventBuilderOptions["name"];
    public once: EventBuilderOptions["once"];
    public run: EventBuilderOptions["run"];

    public constructor(options: EventBuilderOptions) {
        this.name = options.name;
        this.once = options.once;
        this.run = options.run;
    }
}