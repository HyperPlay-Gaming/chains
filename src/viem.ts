import { Chain } from "viem/chains";
import * as chains from "viem/chains";
import { ChainMetadata } from "./common";

// Filter out the non-chain exports
const chainEntries = Object.entries(chains).filter(
    ([_, value]) => typeof value === "object" && "id" in value && "name" in value
);

export const viemChains = chainEntries.map(([_, chain]) => chain);

export const viemChainsMap = viemChains.reduce((acc, chain) => {
    acc[chain.id] = chain;
    return acc;
}, {} as Record<number, (typeof viemChains)[number]>);

type RpcUrls = {
    http: string[];
    webSocket?: string[];
};

export function parseChainMetadataToViemChain(
    chainMetadata: ChainMetadata
): Chain {
    const validRpcs = chainMetadata.chain.rpc.filter(
        (rpc) => !rpc.includes(`\${`)
    );

    const defaultRpcUrl = validRpcs[0];

    if (!defaultRpcUrl) {
        throw new Error("defaultRpcUrl is not defined");
    }

    const rpcUrls: Record<string, RpcUrls> = validRpcs.reduce((acc, url) => {
        acc[url] = {
            http: [url],
        };
        return acc;
    }, {} as Record<string, RpcUrls>);

    const wagmiChain: Chain = {
        id: chainMetadata.chain.chainId,
        name: chainMetadata.chain.name,
        nativeCurrency: {
            name: chainMetadata.chain.nativeCurrency.name,
            symbol: chainMetadata.chain.nativeCurrency.symbol,
            decimals: chainMetadata.chain.nativeCurrency.decimals,
        },
        rpcUrls: {
            ...rpcUrls,
            default: {
                http: [defaultRpcUrl],
            },
            public: {
                http: [defaultRpcUrl],
            },
        },
    };

    if (
        chainMetadata.chain.explorers &&
        chainMetadata.chain.explorers.length > 0
    ) {
        const defaultExplorer = chainMetadata.chain.explorers[0];

        const otherExplorers = chainMetadata.chain.explorers
            .slice(1)
            .reduce((acc, explorer) => {
                acc[explorer.name] = {
                    name: explorer.name,
                    url: explorer.url,
                };
                return acc;
            }, {} as Record<string, { name: string; url: string }>);

        wagmiChain.blockExplorers = {
            default: defaultExplorer,
            ...otherExplorers,
        };
    }

    return wagmiChain;
}
