import { Address, parseAbi, zeroAddress } from "viem";

import { Abis } from "../types";

export class Contract {
    public static factories: Address[] = [zeroAddress, "0x84Ec87B41272223755AdD5f2A8271290aD5d87f0"];  // base, baseSepolia
    public static votes: Address[] = [zeroAddress, "0xc81087D2D32223aCBfA5143Af996C29b8C7628f1"];  // base, baseSepolia
    public static abis: Abis = {
        factory: parseAbi([
            "event Deployed(uint256 indexed id,address indexed user,address indexed contractAddress)",
            "error WithdrawEtherFailed()",
            "error InvalidDeployment(uint256 deploymentId)",
            "error Unauthorized()",
            "function contracts(uint256 deploymentId) view returns (address accessTime)",
            "function deploymentDetails(address accessTime) view returns (bool status,uint256 id,bool includedExtraTime,bool includedPackageModule,string name,string description,string website)",
            "function paused() view returns(bool)",
            "function deploy(uint256 amount,address paymentToken,bool includeExtraTime,bool includePackageModule,string[3] memory details) payable",
            "function updateDeploymentDetails(uint256 deploymentId,string[3] details)",
            "function updateFee(uint256 percent)",
            "function withdrawEther()",
            "function withdrawToken(address tokenAddress)",
            "function pause()",
            "function unpause()"
        ]),
        accessTime: parseAbi([
            "event Purchased(address indexed user,uint256 indexed amount,address indexed paymentToken)",
            "event PurchasedPackage(address indexed user,uint256 indexed amount,address indexed paymentToken,uint256 packageID)",
            "event ExtraUpdated(uint256 indexed extraID,uint256 indexed unixTime,uint256 indexed percent)",
            "event ExtraTimed(address indexed user,uint256 indexed unixTime,uint256 indexed newTime)",
            "event PackageUpdated(uint256 indexed packageID,uint256 indexed time)",
            "event RateUpdate(address indexed paymentToken,uint256 indexed rate)",
            "error DeployerCantBeZeroAddress()",
            "error PurchaseMinOneSecond()",
            "error PurchaseTimeNotEqualToPackageTime()",
            "error WithdrawEtherFailed()",
            "error ExtraTimeModuleNotAsExpected()",
            "error ExtraTimeNotFound(uint256 extraID)",
            "error PackageModuleNotAsExpected()",
            "error PackageNotFound(uint256 packageID)",
            "error EtherOrToken()",
            "error PaymentCantBeZero()",
            "error NotSupported(address paymentToken)",
            "function accessTimes(address client) view returns(uint256 time)",
            "function extras(uint256 extraId) view returns(uint256 unixTime,uint256 percent,bool exist)",
            "function packages(uint256 packageId) view returns(uint256 unixTime,bool exist)",
            "function tokenRates(address paymentToken) view returns(uint256 rate)",
            "function paused() view returns(bool)",
            "function purchase(uint256 amount,address paymentToken) payable",
            "function purchasePackage(uint256 amount,address paymentToken,uint256 packageID) payable",
            "function withdrawEther()",
            "function withdrawToken(address tokenAddress)",
            "function addExtra(uint256 unixTime,uint256 percent)",
            "function updateExtra(uint256 extraID,uint256 unixTime,uint256 percent)",
            "function addPackage(uint256 unixTime)",
            "function updatePackage(uint256 packageID,uint256 unixTime)",
            "function updateRate(address paymentToken,uint256 rate)",
            "function pause()",
            "function unpause()"
        ]),
        vote: parseAbi([
            "event Voted(uint256 indexed epochWeek,address indexed accessTime,address indexed participant,bool vote)",
            "error InvalidAccessTime()",
            "error AlreadyParticipated()",
            "error ZeroAddress()",
            "function votes(uint256 epochWeek,address accessTime,address participant) view returns(bool vote,bool voted)",
            "function paused() view returns(bool)",
            "function participate(address accessTime,bool vote)",
            "function updateFactory(address factoryAddress)",
            "function pause()",
            "function unpause()"
        ])
    };
}
