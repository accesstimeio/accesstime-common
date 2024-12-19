import { zeroAddress } from "viem";

import { Chain, Contract } from "../config";

export const getFactoryAddress = (chainId: number) =>
    Chain.ids.indexOf(chainId) != -1 ?
        Contract.factories[Chain.ids.indexOf(chainId)]
        : zeroAddress;

export const getVoteAddress = (chainId: number) =>
    Chain.ids.indexOf(chainId) != -1 ?
        Contract.votes[Chain.ids.indexOf(chainId)]
        : zeroAddress;
