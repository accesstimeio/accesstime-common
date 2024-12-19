import { Address, parseAbi, zeroAddress } from "viem";
import { Abis } from "../types";

export class Contract {
    public static factories: Address[] = [zeroAddress, "0x84Ec87B41272223755AdD5f2A8271290aD5d87f0"];  // base, baseSepolia
    public static votes: Address[] = [zeroAddress, "0xc81087D2D32223aCBfA5143Af996C29b8C7628f1"];  // base, baseSepolia
    public static abis: Abis = {
        factory: parseAbi([
            "function deploymentDetails(address accessTime) view returns (bool status,uint256 id,bool includedExtraTime,bool includedPackageModule,string name,string description,string website)",
            "function updateDeploymentDetails(uint256 deploymentId, string[3] details)",
            "function contracts(uint256 deploymentId) view returns (address accessTime)",
            "function deploy(uint256 amount,address paymentToken,bool includeExtraTime,bool includePackageModule,string[3] memory details)",
            "event Deployed(uint256 indexed id, address indexed user, address indexed contractAddress)",
        ]),
        accessTime: parseAbi([
            "function purchase(uint256 amount,address paymentToken) payable",
            "function purchasePackage(uint256 amount,address paymentToken,uint256 packageID) payable",
            "function packages(uint256 packageId) view returns (uint256 unixTime,bool exist)",
            "function tokenRates(address paymentToken) view returns (uint256 rate)",
            "function extras(uint256 extraId) view returns (uint256 unixTime,uint256 percent,bool exist)",
            "function owner() view returns(address)",
            "function updateRate(address paymentToken, uint256 rate)",
            "function addPackage(uint256 unixTime)",
            "function updatePackage(uint256 packageID, uint256 unixTime)",
            "event PackageUpdated(uint256 indexed packageID, uint256 indexed time)",
            "function addExtra(uint256 unixTime, uint256 percent)",
            "function updateExtra(uint256 extraID, uint256 unixTime, uint256 percent)",
            "event ExtraUpdated(uint256 indexed extraID, uint256 indexed unixTime, uint256 indexed percent)",
            "function pause()",
            "function unpause()",
            "function transferOwnership(address newOwner)",
            "function acceptOwnership()",
            "function withdrawToken(address tokenAddress)",
            "function withdrawEther()",
        ]),
        vote: parseAbi([
            "function participate(address accessTime, bool vote)",
            "function votes(uint256 epochWeek, address accessTime, address participant) view returns(bool vote, bool voted)"
        ])
    };
}
