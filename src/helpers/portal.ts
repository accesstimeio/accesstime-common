import { PortalCategory } from "../types";

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