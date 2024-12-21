import axios, { AxiosInstance } from "axios";
import { Address, Hash } from "viem";

import { AuthSignature } from "./signature";

import {
    DeploymentDto,
    ExploreResponseDto,
    FavoritesResponseDto,
    ListDeploymentResponseDto,
    PortalProjectDto,
    PortalProjectPackage,
    PortalProjectSocial,
    ProjectResponseDto,
    RatesResponseDto,
    SUPPORTED_SORT_TYPE,
    ToggleFavoriteResponseDto
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

export class PortalApi extends AuthSignature {
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

        const { data } = await this.client.post(`/portal/project/${chainId}/${id}/toggle-favorite`, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
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

        const { data } = await this.client.post(`/portal/creator/update-project-avatar/${chainId}/${id}`, formData, {
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

        if (socials.length == 0) {
            throw new Error("[PortalApi - updateProjectSocials] Payload is empty!");
        }

        const { data } = await this.client.post(`/portal/creator/update-project-socials/${chainId}/${id}`, {
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
        categories: number[]
    ): Promise<boolean> {
        if (!this.authMessage || !this.authSignature) {
            throw new Error("[PortalApi - updateProjectCategories] Auth is required!");
        }

        if (categories.length == 0) {
            throw new Error("[PortalApi - updateProjectCategories] Payload is empty!");
        }

        const { data } = await this.client.post(`/portal/creator/update-project-categories/${chainId}/${id}`, {
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

        const { data } = await this.client.post(`/portal/creator/update-project-content/${chainId}/${id}`, formData, {
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

        const { data } = await this.client.post(`/portal/creator/update-project-packages/${chainId}/${id}`, {
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

        const { data } = await this.client.post(`/portal/creator/update-project-package-image/${chainId}/${id}/${packageId}`, formData, {
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

        const { data } = await this.client.post(`/portal/creator/update-project-package-content/${chainId}/${id}/${packageId}`, formData, {
            headers: {
                "X-ACCESSTIME-AUTH-MESSAGE": this.authMessage,
                "X-ACCESSTIME-AUTH-SIGNATURE": this.authSignature,
            }
        });
        return data;
    };
}
