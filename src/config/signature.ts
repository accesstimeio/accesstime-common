import { Address, Hash, TypedDataDomain, verifyTypedData } from "viem";
import { Api } from "./api";

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
