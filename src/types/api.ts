import { Address } from "viem";

export type DeploymentDto = {
	accessTimeId: string;
	id: Address;
	paused: boolean;
};

export type ListDeploymentResponseDto = {
	page: number;
	maxPage: number;
	deployments: DeploymentDto[];
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
}

export type PortalProjectPackage = {
    id: number;
    title: string;
    backgroundUrl: string;
    contentUrl: string;
}

export interface PortalProjectCard {
    id: Address;
    avatarUrl: string | null;
    votePoint: number;
    voteParticipantCount: number;
    isFavorited: boolean;
    domainVerify: boolean;
    portalVerify: boolean;
    categories: number[];
}

export interface PortalProjectDto extends Omit<PortalProjectCard, "id"> {
    socials: PortalProjectSocial[];
    contentUrl: string | null;
    paymentMethods: Address[];
    packages: PortalProjectPackage[];
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

export interface FeaturedsResponseDto extends Omit<PortalProjectCard, "id"|"votePoint"|"voteParticipantCount"|"isFavorited"|"categories"> {
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
