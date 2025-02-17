import { Address, Hash, Log } from "viem";

export enum TransactionStatus {
	PENDING,
	SUCCESS,
	FAILED,
	LOADING,
}

export interface ProjectInformation {
    id: number;
    name: string;
    description: string;
    website: string;
}

export interface ProjectDetailProps {
    preview: boolean;
    loading?: boolean;
    information: ProjectInformation;
    modules: Module[];
    paymentMethods: TokenRate[];
    extraTimes: ExtraTime[];
    removedExtraTimes?: number[];
    packages: Package[];
    removedPackages?: number[];
    paused: boolean;
    owner: Address;
    prevOwner: Address;
    nextOwner: Address;
    updatePaymentMethod?: (data: TokenRate) => void;
    updateExtraTime?: (data: ExtraTime) => void;
    updatePackage?: (data: Package) => void;
    deletePaymentMethod?: (id: number) => void;
    deleteExtraTime?: (id: number) => void;
    deletePackage?: (id: number) => void;
    resetExtraTime?: (id: number) => void;
    resetPackage?: (id: number) => void;
    pauseToggle?: () => void;
    transferOwnership?: (cancel: boolean) => void;
    acceptOwnership?: () => void;
    withdrawPaymentMethod?: (data: TokenRate) => void;
    packageModuleToggle?: () => void;
    extraTimeModuleToggle?: () => void;
}

export type ModuleType = "extra" | "package";

export interface Module {
    type: ModuleType;
    name: string;
    description: string;
}

export interface TokenRate {
    id: number;
    name: string;
    type: "coin" | "token";
    contract: string | undefined;
    rate: string;
    symbol: string;
    decimals: number;
    balance?: string;
}

export interface PaymentMethodProps {
    details: TokenRate;
    updateable: boolean;
    updatePaymentMethod?: (updateType: "contract" | "rate", value: string) => void;
}

export interface PackageProps {
    details: Package;
    updateable: boolean;
    updatePackage?: (value: number) => void;
}

export interface ExtraTimeProps {
    details: ExtraTime;
    updateable: boolean;
    updateExtraTime?: (updateType: "unixTime" | "percent", value: number) => void;
}

export interface ExtraTime {
    id: number;
    unixTime: number;
    percent: number;
}

export interface Package {
    id: number;
    unixTime: number;
}

export interface ExtendedLog extends Log {
    topics: [] | [signature: `0x${string}`, ...args: `0x${string}`[]];
}

export interface PackageUpdatedEvent {
    eventName: string;
    args: {
        packageID: bigint;
        time: bigint;
    };
}

export interface ExtraUpdatedEvent {
    eventName: string;
    args: {
        extraID: bigint;
        unixTime: bigint;
        percent: bigint;
    };
}

export interface FormValidation {
    name: boolean;
    description: boolean;
    website: boolean;
}

export interface DeploymentTransaction {
    id: number;
    type: "factory" | "accessTime" | "token";
    abi: any;
    functionName: string;
    address: Address;
    args?: any[];
    value?: string;
    transactionHash: Hash;
    status: TransactionStatus;
}

export interface DashboardDefaults {
    projectName: string;
    projectDescription: string;
    projectWebsite: string;
    extraTime: ExtraTime;
    package: Package;
    paymentMethod: TokenRate;
}

export type DashboardModules = Module[];
