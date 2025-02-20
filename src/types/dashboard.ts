import { Log } from "viem";

export enum TransactionStatus {
	PENDING,
	SUCCESS,
	FAILED,
	LOADING,
}

export type ModuleType = "extra" | "package";

export interface Module {
    type: ModuleType;
    name: string;
    description: string;
}

export interface TokenRate {
    id: number;
    type: "coin" | "token";
    contract: string | undefined;
    rate: string;
    balance?: string;
}

export interface ExtraTime {
    id: number;
    unixTime: number;
    percent: number;
}

export interface Package {
    id: number;
    unixTime: number;
}

export interface ExtendedLog extends Log {
    topics: [] | [signature: `0x${string}`, ...args: `0x${string}`[]];
}

export interface DashboardDefaults {
    projectName: string;
    projectDescription: string;
    projectWebsite: string;
    extraTime: ExtraTime;
    package: Package;
    paymentMethod: TokenRate;
}
