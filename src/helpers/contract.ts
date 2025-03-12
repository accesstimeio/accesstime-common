import { zeroAddress } from "viem";

import { Chain, Contract } from "../config";
import { SUPPORTED_CHAIN } from "../types";

export const getFactoryAddress = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ? Contract.factories[Chain.ids.indexOf(chainId)] : zeroAddress;

export const getVoteAddress = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ? Contract.votes[Chain.ids.indexOf(chainId)] : zeroAddress;
