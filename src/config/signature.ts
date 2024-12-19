import { ParseAbiParameters, parseAbiParameters, TypedData, TypedDataDomain } from "viem";
import { Api } from "./api";

export class AuthSignature {
    public static domain: TypedDataDomain = {
        name: "AccessTime API",
        version: Api.version
    };
    public static types: TypedData = {
        Auth: [
            { name: "timestamp", type: "uint256" },
            { name: "caller", type: "address" },
            { name: "apiVersion", type: "string" }
        ]
    };
    public static abiParameters: ParseAbiParameters<string | readonly string[] | readonly unknown[]> = parseAbiParameters(
        "uint256 timestamp, address caller, string apiVersion"
    );
}
