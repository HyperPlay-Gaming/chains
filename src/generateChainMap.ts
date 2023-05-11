import { ChainMap } from "./common";
import commonChainIds from "./mostCommonChains.json";
import { fetchAllChainMetadataMap, fetchChainMetadata } from "./utils";
import * as fs from "node:fs";

/*
 * In the future if the chain metadata map file size is too large,
 * we can choose to only cache the most common chains with this function
 */
async function generateCommonChainMap() {
  const allCommonChainMetadata: ChainMap = {};
  for (const chainId_i of commonChainIds) {
    const chainMetadata = await fetchChainMetadata(chainId_i);
    allCommonChainMetadata[chainMetadata.chain.chainId] = chainMetadata;
  }
  fs.writeFileSync(
    "./src/commonChains.json",
    JSON.stringify(allCommonChainMetadata, null, 4)
  );
}

async function generateAllChainMap() {
  const metadataMap = await fetchAllChainMetadataMap();
  fs.writeFileSync("./src/chains.json", JSON.stringify(metadataMap, null, 4));
}

generateAllChainMap();
export {};
