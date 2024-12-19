import { Chain } from "../config";

export const isSupportedChainId = (chainId: number) => Chain.ids.includes(chainId);

export const getChainName = (chainId: number) =>
    Chain.ids.indexOf(chainId) != -1 ?
        Chain.names[Chain.ids.indexOf(chainId)]
        : "-";

export const getChainCurrencyName = (chainId: number) =>
    Chain.ids.indexOf(chainId) != -1 ?
        Chain.currencyNames[Chain.ids.indexOf(chainId)]
        : "-";
