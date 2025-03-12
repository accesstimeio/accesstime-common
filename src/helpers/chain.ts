import { Chain } from "../config";

import { SUPPORTED_CHAIN } from "../types";

export const isSupportedChainId = (chainId: number) =>
    Chain.ids.includes(chainId as SUPPORTED_CHAIN);

export const getChainName = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ? Chain.names[Chain.ids.indexOf(chainId)] : "-";

export const getChainCurrencySymbol = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ? Chain.currencySymbols[Chain.ids.indexOf(chainId)] : "-";

export const getChainCurrencyDecimals = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ? Chain.currencyDecimals[Chain.ids.indexOf(chainId)] : 18;
