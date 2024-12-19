import axios from "axios";
import { Address, Hash, verifyTypedData } from "viem";

import { AuthSignature } from "./signature";

import {
    DeploymentDto,
    ExploreResponseDto,
    FavoritesResponseDto,
    ListDeploymentResponseDto,
    PortalProjectDto,
    ProjectResponseDto,
    RatesResponseDto,
    SUPPORTED_SORT_TYPE,
    ToggleFavoriteResponseDto
} from "../types";

export class Api {
    public static url: string = "https://api.accesstime.io";
    public static version: string = "0.1.0";
}

export class DashboardApi {
    public static client = axios.create({
        baseURL: Api.url,
    })

    public static async lastDeployments(chainId: number, address: Address): Promise<DeploymentDto[]> {
        const { data } = await this.client.get(`/dashboard/deployment/last/${chainId}/${address}`);
        return data;
    };
    
    public static async listDeployments(
        chainId: number,
        address: Address,
        page: number
    ): Promise<ListDeploymentResponseDto> {
        const { data } = await this.client.get(`/dashboard/deployment/list/${chainId}/${address}?page=${page}`);
        return data;
    };
    
    public static async rates(chainId: number): Promise<RatesResponseDto[]> {
        const { data } = await this.client.get(`/dashboard/deployment/${chainId}/rates`);
        return data;
    };
    
    public static async project(chainId: number, id: number): Promise<ProjectResponseDto> {
        const { data } = await this.client.get(`/dashboard/project/${chainId}/${id}`);
        return data;
    };
}

export class AuthApi {
    public static authMessage: Hash | undefined;
    public static authSignature: Hash | undefined;

    public static async verifyAuthConfig(
        timestamp: number,
        caller: Address,
        authSignature: Hash
    ): Promise<boolean> {
        return await verifyTypedData({
            address: caller,
            domain: AuthSignature.domain,
            types: AuthSignature.types,
            primaryType: "Auth",
            message: {
                timestamp,
                caller,
                apiVersion: Api.version
            },
            signature: authSignature
        });
    }

    public static async setAuthConfig(
        timestamp: number,
        caller: Address,
        authMessage: Hash,
        authSignature: Hash
    ) {
        const verifyResult = await this.verifyAuthConfig(timestamp, caller, authSignature);

        if (!verifyResult) {
            throw new Error("[AuthApi - setAuthConfig] Given auth config is invalid!");
        }

        this.authMessage = authMessage;
        this.authSignature = authSignature;
    }

    public static resetAuthConfig() {
        this.authMessage = undefined;
        this.authSignature = undefined;
    }
}

export class PortalApi extends AuthApi {
    public static client = axios.create({
        baseURL: Api.url,
    })

    public static async featureds(): Promise<any> { // to-do
        const { data } = await this.client.get(`/portal/featureds`);
        return data;
    };

    public static async explore(
        chainId: number,
        page?: number,
        sort?: SUPPORTED_SORT_TYPE
    ): Promise<ExploreResponseDto> {
        const query = new URLSearchParams();
        if (page) {
            query.append("page", page.toString());
        }
        if (sort) {
            query.append("sort", sort.toString());
        }

        const { data } = await this.client.get(
            `/portal/explore/${chainId}` + (query.size > 0 ? `?${query.toString()}` : ""),
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
            query.append("page", page.toString());
        }

        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - favorites] Auth is required!");
        }

        const { data } = await this.client.get(
            `/portal/favorites/${chainId}` + (query.size > 0 ? `?${query.toString()}` : ""),
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
        const { data } = await this.client.get(`/portal/project/${chainId}/${id}`, {
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
    ): Promise<ToggleFavoriteResponseDto> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - toggleFavorite] Auth is required!");
        }

        const { data } = await this.client.get(`/portal/project/${chainId}/${id}/toggle-favorite`, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };
}
