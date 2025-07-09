import { ChainMap } from './common';
export declare const fetchChainMetadata: (chainId: string) => Promise<import('./common').ChainMetadata>;
export declare const fetchAllChainMetadataMap: () => Promise<ChainMap>;
