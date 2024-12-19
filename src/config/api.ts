import axios from "axios";
import { Address } from "viem";
import { DeploymentDto, ListDeploymentResponseDto, ProjectResponseDto, RatesResponseDto } from "../types";

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
    
    public static async project(chainId: number, id: number): Promise<ProjectResponseDto> {
        const { data } = await this.client.get(`/dashboard/project/${chainId}/${id}`);
        return data;
    };
    
    public static async rates(chainId: number): Promise<RatesResponseDto[]> {
        const { data } = await this.client.get(`/dashboard/deployment/${chainId}/rates`);
        return data;
    };
}
