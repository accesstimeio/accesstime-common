import { Chain } from "../config";

import { SUPPORTED_CHAIN } from "../types";

export const isSupportedChainId = (chainId: number) => Chain.ids.includes(chainId as SUPPORTED_CHAIN);

export const getChainName = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ?
        Chain.names[Chain.ids.indexOf(chainId)]
        : "-";

export const getChainCurrencyName = (chainId: SUPPORTED_CHAIN) =>
    Chain.ids.indexOf(chainId) != -1 ?
        Chain.currencyNames[Chain.ids.indexOf(chainId)]
        : "-";
