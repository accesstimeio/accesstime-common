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

export enum StatisticTimeGap {
    WEEK = "604800", // 7 day
    MONTH = "2592000" // 30 day
}

export enum StatisticType {
    DEPLOY_COUNT = 0,
    SOLD_ACCESSTIME = 1,
    USER = 2,
    NEW_USER = 3,
    VOTE = 4,
    INCOME = 5
}

export enum StatisticSoldAccessTimeType {
    COMPANY = 10,
    PROJECT = 11,
}

export enum StatisticUserType {
    COMPANY = 20,
    PROJECT = 21,
}

export enum StatisticNewUserType {
    COMPANY = 30,
    PROJECT = 31,
    CUMULATIVE_PROJECTS = 32
}

export enum StatisticVoteType {
    COMPANY = 40,
    PROJECT = 51,
}

export enum StatisticIncomeType {
    COMPANY = 50,
    PROJECT = 51,
    CUMULATIVE_PROJECTS = 52
}
