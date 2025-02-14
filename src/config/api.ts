import axios, { AxiosInstance } from "axios";
import { Address, encodeAbiParameters, Hash, isAddress, TypedDataDomain, verifyTypedData } from "viem";

import { Portal } from "./portal";

import {
    DeploymentDto,
    ExploreResponseDto,
    FavoritesResponseDto,
    ListDeploymentResponseDto,
    PortalCategory,
    PortalProjectDto,
    PortalProjectPackage,
    PortalProjectSocial,
    ProjectResponseDto,
    RatesResponseDto,
    SUPPORTED_SORT_TYPE,
    ProjectToggleFavoriteResponseDto,
    ProjectVotesResponseDto,
    FeaturedsResponseDto,
    PortalLinkCheckResponseDto,
    PortalLinkUpdateStatusResponseDto,
    PortalRequestDomainVerifyResponseDto,
    PortalCheckDomainVerifyResponseDto
} from "../types";

export class Api {
    public static url: string = "https://api.accesstime.io";
    public static version: string = "0.1.0";

    public static client: AxiosInstance = axios.create({
        baseURL: this.url
    });

    public static updateApiUrl(newUrl: string) {
        this.url = newUrl;

        this.client = axios.create({
            baseURL: newUrl
        });
    }

    public static resetApiUrl() {
        this.url = "https://api.accesstime.io";

        this.client = axios.create({
            baseURL: "https://api.accesstime.io"
        });
    }
}

export class DashboardApi extends Api {
    public static async lastDeployments(chainId: number, address: Address): Promise<DeploymentDto[]> {
        const { data } = await this.client.get(`/v1/dashboard/deployment/last/${chainId}/${address}`);
        return data;
    };

    public static async listDeployments(
        chainId: number,
        address: Address,
        page: number,
        pageCursor?: string
    ): Promise<ListDeploymentResponseDto> {
        const query = new URLSearchParams();
        if (page) {
            if (isNaN(Number(page))) throw new Error("Invalid page query!");

            query.append("page", page.toString());
        }
        if (pageCursor) {
            query.append("pageCursor", pageCursor.toString());
        }

        const { data } = await this.client.get(`/v1/dashboard/deployment/list/${chainId}/${address}` + (query.size > 0 ? `?${query.toString()}` : ""));
        return data;
    };

    public static async rates(chainId: number): Promise<RatesResponseDto[]> {
        const { data } = await this.client.get(`/v1/dashboard/deployment/${chainId}/rates`);
        return data;
    };

    public static async project(chainId: number, id: number): Promise<ProjectResponseDto> {
        const { data } = await this.client.get(`/v1/dashboard/project/${chainId}/${id}`);
        return data;
    };
}

const AuthAbiParameters = [
    { name: "timestamp", type: "uint256" },
    { name: "caller", type: "address" },
    { name: "apiVersion", type: "string" }
] as const;

const AuthTypes = {
    Auth: AuthAbiParameters
} as const;

export class AuthSignature extends Api {
    public static domain: TypedDataDomain = {
        name: "AccessTime API",
        version: this.version
    };
    public static types = AuthTypes;
    public static abiParameters = AuthAbiParameters;

    public static authMessage: Hash | undefined;
    public static authSignature: Hash | undefined;

    public static async verifyAuthConfig(
        timestamp: bigint,
        caller: Address,
        authSignature: Hash
    ): Promise<boolean> {
        return await verifyTypedData({
            address: caller,
            domain: this.domain,
            types: this.types,
            primaryType: "Auth",
            message: {
                timestamp,
                caller,
                apiVersion: this.version
            },
            signature: authSignature
        });
    }

    public static async setAuthConfig(
        timestamp: bigint,
        caller: Address,
        authMessage: Hash,
        authSignature: Hash
    ) {
        const verifyResult = await this.verifyAuthConfig(timestamp, caller, authSignature);

        if (!verifyResult) {
            throw new Error("[AuthSignature - setAuthConfig] Given auth config is invalid!");
        }

        this.authMessage = authMessage;
        this.authSignature = authSignature;
    }

    public static resetAuthConfig() {
        this.authMessage = undefined;
        this.authSignature = undefined;
    }
}

export class PortalApi extends AuthSignature {
    public static async featureds(): Promise<FeaturedsResponseDto[]> {
        const { data } = await this.client.get(`/v1/portal/featureds`);
        return data;
    };

    public static async explore(
        chainId: number,
        page?: number,
        sort?: SUPPORTED_SORT_TYPE,
        paymentMethods?: Address[],
        pageCursor?: string
    ): Promise<ExploreResponseDto> {
        const query = new URLSearchParams();
        if (page) {
            if (isNaN(Number(page))) throw new Error("Invalid page query!");

            query.append("page", page.toString());
        }
        if (sort) {
            if (!Portal.sortTypes.includes(sort)) throw new Error("Invalid sort query!");

            query.append("sort", sort.toString());
        }
        if (paymentMethods && Array.isArray(paymentMethods) && paymentMethods.length > 0) {
            paymentMethods.map((paymentMethod) => {
                if (!isAddress(paymentMethod)) throw new Error("Invalid paymentMethod query!");
            });

            query.append("paymentMethods", paymentMethods.join(","));
        }
        if (pageCursor) {
            query.append("pageCursor", pageCursor.toString());
        }

        const { data } = await this.client.get(
            `/v1/portal/explore/${chainId}` + (query.size > 0 ? `?${query.toString()}` : ""),
            {
                headers: (this.authMessage && this.authSignature) ? {
                    "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                    "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
                } : undefined
            }
        );
        return data;
    };

    public static async favorites(
        chainId: number,
        page?: number
    ): Promise<FavoritesResponseDto> {
        const query = new URLSearchParams();
        if (page) {
            if (isNaN(Number(page))) throw new Error("Invalid page query!");

            query.append("page", page.toString());
        }

        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - favorites] Auth is required!");
        }

        const { data } = await this.client.get(
            `/v1/portal/favorites/${chainId}` + (query.size > 0 ? `?${query.toString()}` : ""),
            {
                headers: {
                    "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                    "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
                }
            }
        );
        return data;
    };

    public static async projectById(
        chainId: number,
        id: number
    ): Promise<PortalProjectDto> {
        const { data } = await this.client.get(`/v1/portal/project/${chainId}/${id}`, {
            headers: (this.authMessage && this.authSignature) ? {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            } : undefined
        });
        return data;
    };

    public static async toggleFavorite(
        chainId: number,
        id: number
    ): Promise<ProjectToggleFavoriteResponseDto> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - toggleFavorite] Auth is required!");
        }

        const { data } = await this.client.post(`/v1/portal/project/${chainId}/${id}/toggle-favorite`, undefined, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async projectVotes(
        chainId: number,
        id: number
    ): Promise<ProjectVotesResponseDto> {
        const { data } = await this.client.get(`/v1/portal/project/${chainId}/${id}/votes`);
        return data;
    };

    public static async updateProjectAvatar(
        chainId: number,
        id: number,
        formData: FormData
    ): Promise<Hash> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectAvatar] Auth is required!");
        }

        if (!formData.has("file")) {
            throw new Error("[PortalApi - updateProjectAvatar] File is not attached!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-avatar/${chainId}/${id}`, formData, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async updateProjectSocials(
        chainId: number,
        id: number,
        socials: PortalProjectSocial[]
    ): Promise<boolean> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectSocials] Auth is required!");
        }

        if (!Array.isArray(socials)) {
            throw new Error("[PortalApi - updateProjectSocials] Payload is not acceptable!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-socials/${chainId}/${id}`, {
            payload: socials
        }, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async updateProjectCategories(
        chainId: number,
        id: number,
        categories: PortalCategory[]
    ): Promise<boolean> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectCategories] Auth is required!");
        }

        if (categories.length == 0) {
            throw new Error("[PortalApi - updateProjectCategories] Payload is empty!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-categories/${chainId}/${id}`, {
            payload: categories
        }, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async updateProjectContent(
        chainId: number,
        id: number,
        formData: FormData
    ): Promise<Hash> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectContent] Auth is required!");
        }

        if (!formData.has("file")) {
            throw new Error("[PortalApi - updateProjectContent] File is not attached!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-content/${chainId}/${id}`, formData, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async updateProjectPackages(
        chainId: number,
        id: number,
        packages: Omit<PortalProjectPackage, "backgroundUrl" | "contentUrl">[]
    ): Promise<boolean> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectPackages] Auth is required!");
        }

        if (packages.length == 0) {
            throw new Error("[PortalApi - updateProjectPackages] Payload is empty!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-packages/${chainId}/${id}`, {
            payload: packages
        }, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async updateProjectPackageImage(
        chainId: number,
        id: number,
        packageId: number,
        formData: FormData
    ): Promise<Hash> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectPackageImage] Auth is required!");
        }

        if (!formData.has("file")) {
            throw new Error("[PortalApi - updateProjectPackageImage] File is not attached!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-package-image/${chainId}/${id}/${packageId}`, formData, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async updateProjectPackageContent(
        chainId: number,
        id: number,
        packageId: number,
        formData: FormData
    ): Promise<Hash> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectPackageContent] Auth is required!");
        }

        if (!formData.has("file")) {
            throw new Error("[PortalApi - updateProjectPackageContent] File is not attached!");
        }

        const { data } = await this.client.post(`/v1/portal/creator/update-project-package-content/${chainId}/${id}/${packageId}`, formData, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };

    public static async toggleFeatured(
        chainId: number,
        id: number
    ): Promise<boolean> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - toggleFeatured] Auth is required!");
        }

        const { data } = await this.client.post(`/v1/portal/project/${chainId}/${id}/toggle-featured`, undefined, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    }

    public static async togglePortalVerify(
        chainId: number,
        id: number
    ): Promise<boolean> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - togglePortalVerify] Auth is required!");
        }

        const { data } = await this.client.post(`/v1/portal/project/${chainId}/${id}/toggle-portal-verify`, undefined, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    }

    public static async linkCheck(link: string): Promise<PortalLinkCheckResponseDto> {
        const hashedLink = encodeAbiParameters([{ type: "string" }], [link.toString()]);

        const { data } = await this.client.get(`/v1/portal/link/check/${hashedLink}`);
        return data;
    };

    public static async linkUpdateStatus(
        link: string,
        status: boolean
    ): Promise<PortalLinkUpdateStatusResponseDto> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - linkUpdateStatus] Auth is required!");
        }

        const hashedLink = encodeAbiParameters([{ type: "string" }], [link.toString()]);

        const { data } = await this.client.post(`/v1/portal/link/check/${hashedLink}`, { allowed: status }, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    }

    public static async requestDomainVerify(
        chainId: number,
        id: number
    ): Promise<PortalRequestDomainVerifyResponseDto> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - requestDomainVerify] Auth is required!");
        }

        const { data } = await this.client.post(`/v1/portal/project/${chainId}/${id}/request-domain-verify`, undefined, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    }

    public static async checkDomainVerify(
        chainId: number,
        id: number
    ): Promise<PortalCheckDomainVerifyResponseDto> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - checkDomainVerify] Auth is required!");
        }

        const { data } = await this.client.post(`/v1/portal/project/${chainId}/${id}/check-domain-verify`, undefined, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    }
}
