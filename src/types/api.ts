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