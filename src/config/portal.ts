import {
    PortalCategory,
    PortalSocialType,
    SUPPORTED_CHAIN,
    SUPPORTED_PAYMENT_METHOD,
    SUPPORTED_SORT_TYPE,
    UploadMaxSizes
} from "../types";

export class Portal {
    public static defaultSortType: SUPPORTED_SORT_TYPE = "weekly_popular";
    public static sortTypes: SUPPORTED_SORT_TYPE[] = ["weekly_popular", "top_rated", "newest"];

    public static categories: PortalCategory[] = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
    public static socialTypes: PortalSocialType[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    public static uploadMaxSizes: UploadMaxSizes = {
        avatar: 1024 * 300,
        content: 1024 * 100,
        packageBackground: 1024 * 150,
        packageContent: 1024 * 100
    };

    public static socialTypePatterns: Record<PortalSocialType, RegExp> = {
        [PortalSocialType.None]: /^[a-zA-Z0-9\s]{0,0}$/,
        [PortalSocialType.GitHub]: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-_.]+\/?$/,
        [PortalSocialType.LinkedIn]: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_.]+\/?$/,
        [PortalSocialType.Twitter]: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
        [PortalSocialType.Farcaster]: /^https?:\/\/(www\.)?farcaster\.xyz\/[a-zA-Z0-9_]+\/?$/,
        [PortalSocialType.Lens]: /^https?:\/\/(www\.)?lens\.xyz\/[a-zA-Z0-9_.-]+\/?$/,
        [PortalSocialType.Discord]: /^https?:\/\/(www\.)?discord\.gg\/[a-zA-Z0-9]+\/?$/,
        [PortalSocialType.Slack]: /^https?:\/\/[a-zA-Z0-9-_.]+\.slack\.com\/?$/,
        [PortalSocialType.YouTube]: /^https?:\/\/(www\.)?youtube\.com\/(channel|c|user)\/[a-zA-Z0-9_-]+\/?$/,
        [PortalSocialType.Instagram]: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
        [PortalSocialType.Reddit]: /^https?:\/\/(www\.)?reddit\.com\/u\/[a-zA-Z0-9_-]+\/?$/,
        [PortalSocialType.Telegram]: /^https?:\/\/(www\.)?t\.me\/[a-zA-Z0-9_]+\/?$/,
        [PortalSocialType.Facebook]: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
        [PortalSocialType.Medium]: /^https?:\/\/(www\.)?medium\.com\/@[a-zA-Z0-9_.-]+\/?$/
    };

    public static supportedPaymentMethods: {
        [key in SUPPORTED_CHAIN]: SUPPORTED_PAYMENT_METHOD[]
    } = {
        8453: [
            {
                name: "Ethereum",
                symbol: "ETH",
                decimal: 18,
                address: "0x0000000000000000000000000000000000000000"
            }
        ],
        84532: [
            {
                name: "Ethereum",
                symbol: "ETH",
                decimal: 18,
                address: "0x0000000000000000000000000000000000000000"
            }
        ]
    };

    public static socialUrlVerify(socialType: PortalSocialType, url: string, throwError?: boolean) {
        if (throwError == true && !this.socialTypes.includes(socialType)) throw new Error("Invalid social type!");

        return this.socialTypePatterns[socialType].test(url);
    }

    public static packageNameVerify(value: string) {
        return /^[a-zA-Z0-9\s]{1,32}$/.test(value);
    }
}