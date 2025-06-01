import { Address } from "viem";

export type DeploymentDto = {
    accessTimeId: string;
    id: Address;
    paused: boolean;
    chainId: number;
};

export type ListDeploymentResponseDto = {
    maxPage: number;
    deployments: DeploymentDto[];
    totalCount: number;
};

export type ProjectResponseDto = {
    id: Address;
    extraTimes: string[];
    removedExtraTimes: string[];
    nextOwner: Address;
    owner: Address;
    packages: string[];
    removedPackages: string[];
    paused: boolean;
    paymentMethods: Address[];
    prevOwner: Address;
};

export type RatesResponseDto = {
    id: Address;
    rate: string;
};

export type PortalProjectSocial = {
    type: number;
    url: string;
};

export type PortalProjectPackage = {
    id: number;
    title: string;
    backgroundUrl: string;
    contentUrl: string;
};

export interface PortalProjectCard {
    id: Address;
    chainId: number;
    avatarUrl: string | null;
    votePoint: number;
    voteParticipantCount: number;
    isFavorited: boolean;
    domainVerify: boolean;
    portalVerify: boolean;
    categories: number[];
}

export interface PortalProjectDto extends Omit<PortalProjectCard, "id" | "chainId"> {
    socials: PortalProjectSocial[];
    contentUrl: string | null;
    paymentMethods: Address[];
    packages: PortalProjectPackage[];
    domainVerifyDetails: PortalRequestDomainVerifyResponseDto | null;
}

export interface ExploreResponseDto {
    countProjects: number;
    maxPage: number;
    projects: PortalProjectCard[];
}

export interface FavoritesResponseDto extends ExploreResponseDto {}

export type ProjectToggleFavoriteResponseDto = {
    isFavoritedNow: boolean | null;
};

export type ProjectVotesResponseDto = {
    previousVotePoint: number;
    previousVoteParticipantCount: number;
    votePoint: number;
    voteParticipantCount: number;
};

export interface FeaturedsResponseDto
    extends Omit<
        PortalProjectCard,
        "id" | "votePoint" | "voteParticipantCount" | "isFavorited" | "categories"
    > {
    id: string;
    chainId: number;
    address: Address;
}

export interface PortalLinkCheckResponseDto {
    allowed: boolean;
}

export interface PortalLinkUpdateStatusResponseDto {
    allowed: boolean | null;
}

export interface PortalRequestDomainVerifyResponseDto {
    domain: string;
    recordKey: string;
    recordValue: string;
}

export interface PortalCheckDomainVerifyResponseDto {
    status: boolean;
}

export interface StatisticsResponseDto {
    value: string;
    timeIndex: string;
}

export interface ProjectUserDto {
    address: Address;
    totalPurchasedTime: string;
    endTime: string;
    usedPaymentMethods: Address[];
}

export interface ProjectUsersResponseDto {
    items: ProjectUserDto[];
    totalCount: number;
    pageCursor: string | null;
    maxPage: number;
}

export interface ProjectIncomeDto {
    accessTimeAddress: Address;
    address: Address;
    amount: string;
    packageId: string;
    paymentAmount: string;
    paymentMethod: Address;
    timestamp: string;
}

export interface ProjectIncomesResponseDto {
    items: ProjectIncomeDto[];
    totalCount: number;
    pageCursor: string | null;
    maxPage: number;
}

export interface SubscriptionDto {
    chainId: number;
    accessTimeAddress: Address;
    endTime: number;
    totalPurchasedTime: number;
}

export interface UserSubscriptionsResponseDto {
    maxPage: number;
    subscriptions: SubscriptionDto[];
    totalCount: number;
}

export interface UserSubscriptionResponseDto extends Omit<SubscriptionDto, "chainId" | "accessTimeAddress"> {}
