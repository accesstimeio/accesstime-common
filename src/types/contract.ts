import { ParseAbi } from "viem";

export type Abi = ParseAbi<readonly string[]>;

export interface Abis {
    factory: Abi;
    accessTime: Abi;
    vote: Abi;
}