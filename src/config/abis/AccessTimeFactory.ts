export const AccessTimeFactoryABI = [
    {
        type: "constructor",
        inputs: [
            {
                name: "ownerAddress",
                type: "address",
                internalType: "address"
            }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "receive",
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "acceptOwnership",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "contracts",
        inputs: [
            {
                name: "deployId",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [
            {
                name: "accessTime",
                type: "address",
                internalType: "contract AccessTime"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "deploy",
        inputs: [
            {
                name: "amount",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "paymentToken",
                type: "address",
                internalType: "address"
            },
            {
                name: "includeExtraTime",
                type: "bool",
                internalType: "bool"
            },
            {
                name: "includePackageModule",
                type: "bool",
                internalType: "bool"
            },
            {
                name: "details",
                type: "string[3]",
                internalType: "string[3]"
            }
        ],
        outputs: [
            {
                name: "newContract",
                type: "address",
                internalType: "contract AccessTime"
            }
        ],
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "deploymentDetails",
        inputs: [
            {
                name: "accessTime",
                type: "address",
                internalType: "contract AccessTime"
            }
        ],
        outputs: [
            {
                name: "status",
                type: "bool",
                internalType: "bool"
            },
            {
                name: "id",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "includedExtraTime",
                type: "bool",
                internalType: "bool"
            },
            {
                name: "includedPackageModule",
                type: "bool",
                internalType: "bool"
            },
            {
                name: "name",
                type: "string",
                internalType: "string"
            },
            {
                name: "description",
                type: "string",
                internalType: "string"
            },
            {
                name: "website",
                type: "string",
                internalType: "string"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "pause",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "paused",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "pendingOwner",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "address",
                internalType: "address"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "renounceOwnership",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "tokenRates",
        inputs: [
            {
                name: "paymentToken",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [
            {
                name: "rate",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "transferOwnership",
        inputs: [
            {
                name: "newOwner",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "unpause",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "updateDeploymentDetails",
        inputs: [
            {
                name: "deploymentId",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "details",
                type: "string[3]",
                internalType: "string[3]"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "updateFee",
        inputs: [
            {
                name: "percent",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "updateRate",
        inputs: [
            {
                name: "paymentToken",
                type: "address",
                internalType: "address"
            },
            {
                name: "rate",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "withdrawEther",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "withdrawToken",
        inputs: [
            {
                name: "tokenAddress",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "event",
        name: "Deployed",
        inputs: [
            {
                name: "id",
                type: "uint256",
                indexed: true,
                internalType: "uint256"
            },
            {
                name: "user",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "contractAddress",
                type: "address",
                indexed: true,
                internalType: "contract AccessTime"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "OwnershipTransferStarted",
        inputs: [
            {
                name: "previousOwner",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "newOwner",
                type: "address",
                indexed: true,
                internalType: "address"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "OwnershipTransferred",
        inputs: [
            {
                name: "previousOwner",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "newOwner",
                type: "address",
                indexed: true,
                internalType: "address"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Paused",
        inputs: [
            {
                name: "account",
                type: "address",
                indexed: false,
                internalType: "address"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "RateUpdate",
        inputs: [
            {
                name: "paymentToken",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "rate",
                type: "uint256",
                indexed: true,
                internalType: "uint256"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Unpaused",
        inputs: [
            {
                name: "account",
                type: "address",
                indexed: false,
                internalType: "address"
            }
        ],
        anonymous: false
    },
    {
        type: "error",
        name: "EnforcedPause",
        inputs: []
    },
    {
        type: "error",
        name: "EtherOrToken",
        inputs: []
    },
    {
        type: "error",
        name: "ExpectedPause",
        inputs: []
    },
    {
        type: "error",
        name: "InvalidDeployment",
        inputs: [
            {
                name: "deploymentId",
                type: "uint256",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "error",
        name: "NotSupported",
        inputs: [
            {
                name: "paymentToken",
                type: "address",
                internalType: "address"
            }
        ]
    },
    {
        type: "error",
        name: "OwnableInvalidOwner",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address"
            }
        ]
    },
    {
        type: "error",
        name: "OwnableUnauthorizedAccount",
        inputs: [
            {
                name: "account",
                type: "address",
                internalType: "address"
            }
        ]
    },
    {
        type: "error",
        name: "PaymentCantBeZero",
        inputs: []
    },
    {
        type: "error",
        name: "Unauthorized",
        inputs: []
    },
    {
        type: "error",
        name: "WithdrawEtherFailed",
        inputs: []
    }
] as const;
