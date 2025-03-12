import { Address } from "viem";

export type SUPPORTED_SORT_TYPE = "weekly_popular" | "top_rated" | "newest";

export interface UploadMaxSizes {
    avatar: number;
    content: number;
    packageBackground: number;
    packageContent: number;
}

export enum PortalCategory {
    Other = -1,
    Technology = 0,
    Education = 1,
    Health = 2,
    Creativity = 3,
    Finance = 4,
    Gaming = 5,
    Social = 6,
    Business = 7
}

export enum PortalSocialType {
    None = -1,
    GitHub = 0,
    LinkedIn = 1,
    Twitter = 2,
    Farcaster = 3,
    Lens = 4,
    Discord = 5,
    Slack = 6,
    YouTube = 7,
    Instagram = 8,
    Reddit = 9,
    Telegram = 10,
    Facebook = 11,
    Medium = 12
}

export type SUPPORTED_PAYMENT_METHOD = {
    name: string;
    symbol: string;
    decimal: number;
    address: Address;
};
