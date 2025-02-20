import { Address } from "viem";

export * from "./chain";
export * from "./contract";
export * from "./portal";

export const shortenAddress = (address: Address) => {
    return `${address?.slice(0, 6)}…${address?.slice(-4)}`;
};
