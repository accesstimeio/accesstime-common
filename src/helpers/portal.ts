import { PortalCategory, PortalSocialType } from "../types";

export const getCategoryText = (type: PortalCategory) => {
    switch (type) {
        case PortalCategory.Other:
            return "Other";
        case PortalCategory.Business:
            return "Business";
        case PortalCategory.Creativity:
            return "Creativity";
        case PortalCategory.Education:
            return "Education";
        case PortalCategory.Finance:
            return "Finance";
        case PortalCategory.Gaming:
            return "Gaming";
        case PortalCategory.Health:
            return "Health";
        case PortalCategory.Social:
            return "Social";
        case PortalCategory.Technology:
            return "Technology";
        default:
            return "not-supported"
    }
}

export const getSocialTypeText = (type: PortalSocialType) => {
    switch (type) {
        case PortalSocialType.None:
            return "None";
        case PortalSocialType.GitHub:
            return "GitHub";
        case PortalSocialType.LinkedIn:
            return "LinkedIn";
        case PortalSocialType.Twitter:
            return "Twitter";
        case PortalSocialType.Farcaster:
            return "Farcaster";
        case PortalSocialType.Lens:
            return "Lens";
        case PortalSocialType.Discord:
            return "Discord";
        case PortalSocialType.Slack:
            return "Slack";
        case PortalSocialType.YouTube:
            return "YouTube";
        case PortalSocialType.Instagram:
            return "Instagram";
        case PortalSocialType.Reddit:
            return "Reddit";
        case PortalSocialType.Telegram:
            return "Telegram";
        case PortalSocialType.Facebook:
            return "Facebook";
        case PortalSocialType.Medium:
            return "Medium";
        default:
            return "not-supported"
    }
}

export const extractDomain = (input: string): string | null => {
    try {
        const normalizedInput = input.trim();
        const hasProtocol = normalizedInput.startsWith('http://') || normalizedInput.startsWith('https://');
    
        const urlToParse = hasProtocol ? normalizedInput : `https://${normalizedInput}`;
    
        if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(urlToParse)) {
            return null;
        }
    
        const parsedUrl = new URL(urlToParse);
        const hostname = parsedUrl.hostname;
    
        const parts = hostname.split('.');
    
        if (parts.length < 2 || !/^[a-zA-Z]{2,}$/.test(parts[parts.length - 1])) {
            return null;
        }
    
        const extractedParts = parts.slice(-3);
        return extractedParts.join('.');
    } catch (_err) {
        return null;
    }
}
