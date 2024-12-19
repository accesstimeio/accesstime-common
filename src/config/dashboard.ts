import { parseEther, zeroAddress } from "viem";
import { DashboardDefaults, DashboardModules } from "../types";

export class Dashboard {
    public static defaults: DashboardDefaults = {
        projectName: "Example project",
        projectDescription: "Dummy description",
        projectWebsite: "accesstime.io",
        extraTime: {
            id: 0,
            unixTime: 3600,
            percent: 20,
        },
        package: {
            id: 0,
            unixTime: 864000,
        },
        paymentMethod: {
            id: 0,
            name: "Ethereum",
            symbol: "ETH",
            type: "coin",
            contract: zeroAddress,
            rate: parseEther("1").toString(),
        }
    }
    public static modules: DashboardModules = [
        {
            name: "Fixed Packages",
            type: "package",
            description: "Simple non-flexliable purchase times",
        },
        {
            name: "Extra Time",
            type: "extra",
            description: "Customers can get extra times on purchases",
        }
    ]
}