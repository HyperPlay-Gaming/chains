import { ChainMap, ChainMetadata } from "./common.d";

import chains from "./chains.json";
import { fetchChainMetadata } from "./utils";
const commonChains = chains as ChainMap;

export async function getChainMetadata(
  chainid: string
): Promise<ChainMetadata> {
  if (Object.hasOwn(commonChains, chainid)) return commonChains[chainid];
  const metadata = await fetchChainMetadata(chainid);
  return metadata;
}
