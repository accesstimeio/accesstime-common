import { Address } from "viem";

import { AccessTimeFactoryABI } from "./abis/AccessTimeFactory";
import { AccessTimeABI } from "./abis/AccessTime";
import { AccessVoteABI } from "./abis/AccessVote";

export class Contract {
    public static factories: Address[] = ["0x43bBff1FFc36A1Dd4A5229B577b400DD0d9AbE6b", "0x9Bb804E92CE60c0C900E18b3196B73e620D613bA"];  // base, baseSepolia
    public static votes: Address[] = ["0x88665b71cCf8dbD4B4eA9210ac9aA4614f10C2DA", "0x13c3D0435fB0bE55dCAb45EB32393F64695497Cc"];  // base, baseSepolia
    public static abis = {
        factory: AccessTimeFactoryABI,
        accessTime: AccessTimeABI,
        vote: AccessVoteABI
    };
}
