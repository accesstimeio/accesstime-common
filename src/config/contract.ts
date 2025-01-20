import { Address, zeroAddress } from "viem";

import { AccessTimeFactoryABI } from "./abis/AccessTimeFactory";
import { AccessTimeABI } from "./abis/AccessTime";
import { AccessVoteABI } from "./abis/AccessVote";

export class Contract {
    public static factories: Address[] = [zeroAddress, "0x34a19057A17c17c18191Dc443f8DCCfa3A294b61"];  // base, baseSepolia
    public static votes: Address[] = [zeroAddress, "0x13c3D0435fB0bE55dCAb45EB32393F64695497Cc"];  // base, baseSepolia
    public static abis = {
        factory: AccessTimeFactoryABI,
        accessTime: AccessTimeABI,
        vote: AccessVoteABI
    };
}
