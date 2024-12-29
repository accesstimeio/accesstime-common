import { base, baseSepolia } from "viem/chains";

import { SUPPORTED_CHAIN } from "../types";

export class Chain {
    public static ids: SUPPORTED_CHAIN[] = [8453, 84532]; // base, baseSepolia
    public static names: string[] = ["Base", "Base Sepolia"]; // base, baseSepolia
    public static currencyNames: string[] = ["ETH", "ETH"]; // base, baseSepolia
    public static wagmiConfig = [base, baseSepolia];
}
