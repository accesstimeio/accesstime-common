import { parseEther, zeroAddress } from "viem";

import { DashboardDefaults, FixedTime, Module } from "../types";

export class Dashboard {
    public static defaults: DashboardDefaults = {
        projectName: "Example project",
        projectDescription: "Dummy description",
        projectWebsite: "accesstime.io",
        extraTime: {
            id: 0,
            unixTime: 3600,
            percent: 20
        },
        package: {
            id: 0,
            unixTime: 3600 * 24
        },
        paymentMethod: {
            id: 0,
            type: "coin",
            contract: zeroAddress,
            rate: parseEther("1").toString()
        }
    };
    public static modules: Module[] = [
        {
            name: "Fixed Packages",
            type: "package",
            description: "Simple non-flexliable purchase times"
        },
        {
            name: "Extra Time",
            type: "extra",
            description: "Customers can get extra times on purchases"
        }
    ];
    public static fixedTimes: FixedTime[] = [
        {
            text: "1H",
            value: 3600
        },
        {
            text: "4H",
            value: 3600 * 4
        },
        {
            text: "1D",
            value: 3600 * 24
        },
        {
            text: "1W",
            value: 3600 * 24 * 7
        },
        {
            text: "1M",
            value: 3600 * 24 * 28
        },
        {
            text: "3M",
            value: 3600 * 24 * 28 * 3
        },
        {
            text: "1Y",
            value: 3600 * 24 * 28 * 12
        }
    ];
}
