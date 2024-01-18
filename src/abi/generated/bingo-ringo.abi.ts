export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gameLogicImplementation"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC1167FailedCreateClone",
        "inputs": []
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "type": "address",
                "name": "account"
            }
        ]
    },
    {
        "type": "error",
        "name": "PrizeIsTooLow",
        "inputs": [
            {
                "type": "uint256",
                "name": "prizeIndex"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "GameCreated",
        "inputs": [
            {
                "type": "address",
                "name": "game",
                "indexed": false
            },
            {
                "type": "string",
                "name": "name",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "sectorsAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "everyNSectorIsAWinner",
                "indexed": false
            },
            {
                "type": "uint256[]",
                "name": "prizes"
            },
            {
                "type": "uint256",
                "name": "sectorPrice",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "activeGames",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "deleteGame",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "gameLogicImplementation",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "games",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": "name"
            },
            {
                "type": "uint256",
                "name": "sectorsAmount"
            },
            {
                "type": "uint256",
                "name": "everyNSectorIsAWinner"
            },
            {
                "type": "uint256",
                "name": "sectorPrice"
            }
        ]
    },
    {
        "type": "function",
        "name": "getActiveGames",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "initGame",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "name"
            },
            {
                "type": "uint256",
                "name": "sectorsAmount"
            },
            {
                "type": "uint256",
                "name": "everyNSectorIsAWinner"
            },
            {
                "type": "uint256[]",
                "name": "prizes"
            },
            {
                "type": "uint256",
                "name": "sectorPrice"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "game"
            }
        ]
    },
    {
        "type": "function",
        "name": "maxSectorsAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "minSectorsAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    }
]
