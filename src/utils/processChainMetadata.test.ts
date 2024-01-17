import { expect, test } from 'vitest'
import { processChainMetadata } from "./processChainMetadata"
import { ChainMetadata, ChainMetadataParams } from '../common'

function getChainMetadata(): ChainMetadata {
    return {
        chain: {
            "name": "Arbitrum One",
            "chainId": 42161,
            "shortName": "arb1",
            "chain": "ETH",
            "networkId": 42161,
            "nativeCurrency": {
                "name": "Ether",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpc": [
                "https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}",
                "https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}",
                "https://arb1.arbitrum.io/rpc",
                "https://arbitrum-one.publicnode.com",
                "wss://arbitrum-one.publicnode.com"
            ],
            "faucets": [],
            "explorers": [
                {
                    "name": "Arbiscan",
                    "url": "https://arbiscan.io",
                    "standard": "EIP3091"
                },
                {
                    "name": "Arbitrum Explorer",
                    "url": "https://explorer.arbitrum.io",
                    "standard": "EIP3091"
                },
                {
                    "name": "dexguru",
                    "url": "https://arbitrum.dex.guru",
                    "icon": "dexguru",
                    "standard": "EIP3091"
                }
            ],
            "infoURL": "https://arbitrum.io",
            "parent": {
                "type": "L2",
                "chain": "eip155-1",
                "bridges": [
                    {
                        "url": "https://bridge.arbitrum.io"
                    }
                ]
            }
        }
    }
}

test('matches infura url', () => {
    const chainMetadata = getChainMetadata()
    const params: ChainMetadataParams = {
        INFURA_API_KEY: 'test_infura',
        ALCHEMY_API_KEY: 'test_alchemy'
    }
    processChainMetadata(chainMetadata, params)

    expect(chainMetadata.chain.rpc[0]).to.eq('https://arbitrum-mainnet.infura.io/v3/test_infura')
})

test('matches alchemy url', () => {
    const chainMetadata = getChainMetadata()
    const params: ChainMetadataParams = {
        ALCHEMY_API_KEY: 'test_alchemy'
    }
    processChainMetadata(chainMetadata, params)

    expect(chainMetadata.chain.rpc[0]).to.eq('https://arb-mainnet.g.alchemy.com/v2/test_alchemy')
})
