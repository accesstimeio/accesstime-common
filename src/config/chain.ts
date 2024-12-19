import { base, baseSepolia } from "viem/chains";

export class Chain {
    public static ids: number[] = [8453, 84532]; // base, baseSepolia
    public static names: string[] = ["Base", "Base Sepolia"]; // base, baseSepolia
    public static currencyNames: string[] = ["ETH", "ETH"]; // base, baseSepolia
    public static wagmiConfig = [base, baseSepolia];
}
