import { User, GuildMember, Message, BaseInteraction, BaseChannel, MessageMentionOptions, Collection, EmbedBuilder } from "discord.js";

export type userResolvable = User | GuildMember | Message | BaseInteraction | Player | PlayerYokai | string;
export type channelResolvable = BaseChannel | Message | BaseInteraction | string;

export type itemKey = string;
export enum ComponentIds {
    YokaiHeal = 'button.static.yokai.heal',
    YokaiHealSelector = 'selectors.string.static.yokai.heal.item',
    BingokaiSelector = 'selectors.string.dynamic.bingokai.coin',
    ShopBuy = 'button.static.shop.buyItem',
    ShopNext = 'button.static.shop.page.next',
    ShopPrevious = 'button.static.shop.page.previous',
    ShopBuyModal = 'modal.dynamic.shop.buy.name',
    ShopBuyModalField = 'modal.dynamic.shop.buy.input',
    ShopBuyModalQuantity = 'modal.dynamic.shop.buy.quantity',
    ControlItemModal = 'modal.dynamic.control.items',
    ControlItemModalField = 'modal.dynamic.control.items.name',
    ControlItemModalQuantity = 'modal.dynamic.control.items.quantity'
}
export type fractionnedReplyOptions = {
    contents: string[];
    delay?: number;
    joiner?: string;
    allowedMentions?: MessageMentionOptions;
    replierCache?: replierCacheType;
    messageReference: Message;
};
export type fractionnedReplyCallback = () => unknown;
export type replierCacheType = {
    replied: boolean;
    message?: Message<true>;
};
export type logOptionType<K extends keyof typeof LogTypes> = Omit<logs<false, (typeof LogTypes)[K]>, 'type' | 'id' |'loggedAt'> & { type: K }
export type If<C extends boolean, A extends any, B = any> = C extends true ? A : C extends false ? B : never;

export enum Tables {
    Players = 'ykw_bot__players',
    Logs = 'ykw_bot__logs'
}
export type databaseYokai = {
    id: string;
    strength: number;
    level: number;
    pv: number;
    maxPv: number;
    koAt: number;
    usage: number;
};
export type playerStats = {
    lastBeaten: string;
    strongestBeaten: string;
    beatenByRank: number[];
};
export type playerType<Raw extends boolean = false> = {
    id: string;
    yokais: If<Raw, string, databaseYokai[]>;
    team: If<Raw, string, string[]>;
    vp: If<Raw, string, number>;
    wins: If<Raw, string, number>;
    items: If<Raw, string, { key: itemKey; count: number }[]>;
    stats: If<Raw, string, playerStats>;
};
export enum LogTypes {
    coinsAdd = 0,
    coinsRemove = 1,
    yokaiAdd = 2,
    yokaiRemove = 3,
    yokaiKoed = 4,
    yokaiReanimated = 5,
    itemBought = 6,
    CoinsSet = 7,
    winsSet = 8,
    itemAdd = 9,
    itemRemove = 10
}
export type logBy = 'user' | 'system' | 'admin'
export type logMetadata<T extends LogTypes> =
 T extends LogTypes.coinsAdd | LogTypes.coinsRemove | LogTypes.CoinsSet
    ? { amount: number }
    : T extends LogTypes.yokaiAdd | LogTypes.yokaiRemove | LogTypes.yokaiKoed | LogTypes.yokaiReanimated
    ? { yokai: string; by: logBy; adminId?: string; }
    : T extends LogTypes.itemBought ?
    { item: string; quantity: number; price: number; } :
    T extends LogTypes.winsSet ? {
        from: number; to: number;
    } : T extends LogTypes.itemAdd | LogTypes.itemRemove? {
        item: string; quantity: number; by: logBy; adminId?: string
    }
    : {};

export type logs<Raw extends boolean, T extends LogTypes> = {
    id: string;
    type: T;
    targetId: string;
    loggedAt: If<Raw, string, number>;
} & If<Raw, { metadata: logMetadata<T> }, logMetadata<T>>;
export type yokaiRank = 'a' | 'b' | 'c' | 'd' | 'e' | 's' | 'z';
export type yokai = {
    name: string;
    id: string;
    rank: yokaiRank;
    tribe: string;
    img: string;
};
export type playerYokai = yokai & {
    strength: number;
    pv: number;
    level: number;
};
export enum StrengthRank {
    e = 1,
    d = 1.1,
    c = 1.2,
    b = 1.3,
    a = 1.4,
    s = 1.6,
    z = 3.5
}
export const RanksProba: Record<keyof typeof StrengthRank, number>
export const vpRanks: Record<keyof typeof StrengthRank, number>
export type npcComputation = {
    strength: number;
    pv: number;
    maxPv: number;
};

export enum RankValues {
    e = 1,
    d = 2,
    c = 3,
    b = 4,
    a = 5,
    s = 6,
    z = 7
}
export type npcFightOption = {
    message: Message<true>;
    npc: NPC;
    player: Player;
    idle?: number;
};
export type fightLogAction = 'attack' | 'switch';
export type fightLogAttack = {
    damages: number;
    enemyAt: {
        pv: number;
        maxPv: number;
        name: string;
    };
};
export type fightLogSwitch = {
    to: {
        name: string;
        pv: number;
        maxPv: number;
    };
};
export type fightActor = 'player' | 'npc';
export type npcFightLog<A extends fightLogAction = fightLogAction> = {
    actor: fightActor;
    action: A;
    dataAt: {
        pv: number;
        maxPv: number;
        name: string;
    };
} & (A extends 'attack' ? fightLogAttack : A extends 'switch' ? fightLogSwitch : never);
export type fightEndReason = 'userwin' | 'npcwin' | 'flee' | 'surrender';
export type endCallback = (reason: fightEndReason, fight: NPCFight) => unknown;
export type beginCallback = (fight: NPCFight) => unknown;
export enum FightButtons {
    Attack = 'buttons.fight.npc.attack',
    Switch = 'buttons.fight.npc.switch',
    Resign = 'buttons.fight.npc.resign',
    Automatic = 'buttons.fight.npc.automatic',
    SwitchModal = 'modals.fight.npc.switch',
    PlayerAttack = 'buttons.fight.player.attack',
    PlayerSwitch = 'buttons.fight.player.switch',
    PlayerResign = 'buttons.fight.player.resign'
}
export type afterRound = (fight: NPCFight) => unknown;

export type playerFightOptions = {
    players: [Player, Player];
    message: Message<true>;
    idle?: number;
};
export type playerFightEndReason =
    | 'firstwins'
    | 'secondwins'
    | 'firstresign'
    | 'secondresign'
    | 'firstflee'
    | 'secondflee';
export interface FightCallbacks {
    begin: (fight: Fight) => unknown;
    round: (fight: Fight) => unknown;
    end: (fight: Fight, reason: playerFightEndReason) => unknown;
}
export type fightCapture = {
    name: string;
    pv: number;
    maxPv: number;
};
export type playerFightAction = 'attack' | 'switch';
export type playerFightLog<A extends playerFightAction = playerFightAction> = {
    action: A;
    index: number;
    capture: fightCapture;
} & (A extends 'switch'
    ? {
          to: fightCapture;
      }
    : A extends 'attack'
      ? {
            enemy: fightCapture;
            damages: number;
        }
      : never);
export type fightInterpretation = {
    winner: Player;
    by: 'timeout' | 'resignation' | 'victory';
    looser: Player;
};

export class Player {
    constructor(input: playerType<true>);

    // Statics
    static fromPlayer(input: Player): Player
    static inputize(cache: playerType<false>): playerType<true>;

    // Voids
    public setWins(wins: number): void
    public mergeFromPlayer(player: Player): void
    public mergeYokai(yokai: PlayerYokai): void
    public setStrongestBeaten(id: string): void;
    public setLastBeaten(id: string): void;
    public addBeat(rank: yokaiRank): void;
    public addWin(): void;
    public manageVp(action: 'add' | 'remove' | 'set', value: number): void;
    public bulk(): void;
    public bulkEdit(): false | void
    public pushLogs(): void;
    public update(): void;
    public log<K extends keyof typeof LogTypes>(
        log: Omit<logs<false, (typeof LogTypes)[K]>, 'type' | 'id' | 'loggedAt'> & { type: K }
    ): void;

    // Returns
    public findYokais(name: string, group?: 'all' | 'team'): PlayerYokai[];
    public getItem<K extends itemKey>(key: K): { item: Item<K>; count: number };
    public itemSet(key: itemKey, number: number, operation: 'add' | 'remove' | 'set'): void;
    public addYokai(id: string): 'already exists' | PlayerYokai;
    public removeYokai(id: string): 'unknown' | 'ok'
    public appendTeam(id: string, positionIndex?: number): 'unknown' | 'already in' | 'max reached' | 'ok'
    public removeTeam(id: string): 'unknown' | 'not in' | 'ok';
    public getYokai(id: string): PlayerYokai
    public clearTeam(update?: boolean): PlayerYokai[]

    public toJSON(): playerType<false>;

    // Getters
    public get stats(): { lastBeaten: string | null; beatenByRank: number[]; strongestBeaten: string | null };
    public get items(): Collection<itemKey, [Item<itemKey>, number]>
    public get vp(): number;
    public get totalLevels(): number;
    public get id(): string
    /**
     * Yokais by ID
     */
    public get yokais(): Record<string, PlayerYokai>;
    public get team(): PlayerYokai[];
    public get wins(): number;
    public get teamLevel(): number
    public get fightTable(): Record<yokaiRank, number>;
}
export class PlayerYokai {
    constructor(input: databaseYokai, player: Player);

    // Statics
    static compareYokai(yokais: (PlayerYokai | NPC)[]): number;
    static fromType(type: yokai, player: Player): PlayerYokai;
    static fromYokai(input: playerYokai, player: Player): PlayerYokai;

    // Getters
    public get player(): Player
    public get healable(): boolean;
    public get img(): string
    public get unkoAt(): number | null
    public get dead(): boolean
    public get maxPv(): number
    public get level(): number
    public get id(): string
    public get pv(): number;
    public get strength(): number;
    public get rank(): number
    public get tribe(): string
    public get name(): string;
    public get evolveable(): boolean
    public get levelLimit(): number;
    public get usage(): number;

    // Voids
    public evolve(): void;
    public setPv(pv: number): void
    public setMaxPv(pv: number): void;
    public setStrength(strength: number): void;
    public setType(id: string): void;
    public setLevel(level: number): void;
    public resurrect(): void;
    public setUsage(int: number): void;
    public addUsage(): void;

    // Returns
    public display(options: { emoji?: boolean; docorations?: boolean }): string;
    public calculateToLevel(level: number): databaseYokai;
    public attack(): number;
    /**
     * Damages the yokai 
     * 
     * @param damages number
     * @returns `boolean` If the yokai is dead
     */
    public damage(damages: number): boolean;    
    public capture(): { name: string; pv: number; maxPv: number };
    public toJSON(): databaseYokai;
}
export type itemType = 'food' | 'coins'
export type itemDatas<K extends itemKey, T extends itemType = itemType> = {
    key: K;
    price: number;
    name: string;
    proba: number;
} & (T extends 'food'
    ? {
          img: string;
      }
    : T extends 'coin'
      ? {
            rank: number;
        }
      : never);
      export type itemsFilter = 'all' | 'food' | 'coins';
export type foodItemKey = itemKey;
export type coinItemKey = itemKey
export type itemsReturn<F extends itemsFilter> = F extends 'all'
    ? Record<itemKey, Item<itemKey>>
    : F extends 'food'
      ? Record<foodItemKey, Item<foodItemKey>>
      : F extends 'coins'
        ? Record<coinItemKey, Item<coinItemKey>>
        : never;


export class Item<Key extends itemKey> {
    constructor(key: Key);

    public get name(): string;
    public get key(): Key;

    public get img(): string;
    public get rank(): number;
    public get price(): number;
    public get proba(): number;

    public toJSON(): itemDatas<Key>;

    public isFood(): this is itemDatas<Key, 'food'>;
    public isCoins(): this is itemDatas<Key, 'coins'>
}
export class NPC {
    constructor(id: string);

    public get name(): string
    public get id(): string
    public get rank(): yokaiRank;
    public get tribe(): string;
    public get strength(): number;
    public get pv(): number;
    public get maxPv(): number;
    public get display(): string;
    public get dead(): boolean;

    public capture(): { name: string; pv: number; maxPv: number }
    /**
     * Damages the NPC
     * 
     * @param pv `number` The amount of pv to remove
     * @eturns `boolean` If the NPC is dead
     */
    public damage(pv: number): boolean
}
export class NPCFight {
    constructor(options: npcFightOption);

    public onEnd(callback: endCallback): this;
    public onStart(callback: beginCallback): this;
    public afterRound(callback: afterRound): this;

    public get ended(): boolean
    public get endReason(): fightEndReason;
    public get player(): Player
    public get npc(): NPC
    public get playerYokai(): PlayerYokai

    public attack(damages: number): void
    public switchYokai(id: string): void
    public surrender(): void
}
export class Fight {
    constructor(options: playerFightOptions);

    public get interpretation(): fightInterpretation;
    public get ended(): boolean
    public get endReason(): playerFightEndReason;
    public get first(): Player
    public get second(): Player;
    public get yokaip(): PlayerYokai
    public get yokaid(): PlayerYokai
    public get enemy(): { player: Player; yokai: PlayerYokai }
    public get yokai(): PlayerYokai
    public get player(): Player
    public on<T extends keyof FightCallbacks>(event: T, callback: FightCallbacks[T]): this;

    public attack(): void
    public switch(id: string): void;
    public surrender(): void;
}
export type panelOptions = {
    controler: User;
    player: Player;
    message: Message;
};
export enum PanelButtonIds {
    Save = 'panel.save',
    Cancel = 'panel.cancel',
    Vp = 'panel.vp',
    Wins = 'panel.wins',
    Yokais = 'panel.yokais',
    AddYokai = 'panel.yokais.add',
    RemoveYokai = 'panel.yokais.remove',
    EditYokai = 'panel.yokais.edit',
    HomePage = 'panel.home',
    YokaiBack = 'panel.yokai.back',
    YokaiSave = 'panel.yokai.save',
    YokaiLevel = 'panel.yokai.level',
    YokaiStrength = 'panel.yokai.strength',
    YokaiType = 'panel.yokai.type',
    YokaiPv = 'panel.yokai.pv',
    YokaiMaxPv = 'panel.yokai.pv.max',
    YokaiToggleState = 'panel.yokai.state.switch',
    AddTime = 'panel.addtime',
    ItemPage = 'panel.items',
    AddItem = 'panel.items.add',
    RemoveItem = 'panel.items.remove'
}

export type tradeProcessOptions = {
    trader: [Player, User];
    target: [Player, User];
    reference: Message<true>;
    time?: number;
};
export type tradeProcessState = 'canceled' | 'terminated';
export type tradeObject<S extends tradeProcessState = tradeProcessState> = {
    state: S;
} & (S extends 'terminated'
    ? {
          yokais: {
              trader: PlayerYokai;
              target: PlayerYokai;
          };
      }
    : {});
export type tradeProcessReturn = Promise<tradeObject>;
export type tradeProcessCache = {
    questionning: boolean;
    currentId: string;
    state: 'traderpicks' | 'targetpicks' | 'traderconfirms' | 'targetconfirms';
    selection: {
        trader: PlayerYokai;
        target: PlayerYokai;
    };
};
export type validVpOptions = {
    reference: Message<true>;
    player: [Player, User];
    time?: number;
    customembed?: EmbedBuilder;
};
export type ValidVpReturn = number | 'cancel';
