import { ChainMap, ChainMetadata, ChainMetadataParams } from './common.d';
import { parseChainMetadataToViemChain } from './viem';
export declare function getChainMetadata(chainId: string, params?: ChainMetadataParams): Promise<ChainMetadata>;
export declare function getChainMetadataSync(chainId: string, params?: ChainMetadataParams): ChainMetadata | undefined;
export declare const chainMap: ChainMap;
export { parseChainMetadataToViemChain };
