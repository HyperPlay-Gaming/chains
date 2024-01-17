interface Feature {
  name: string;
}
interface Explorer {
  name: string;
  url: string;
  standard: string;
}

export interface EthListChainMetadata {
  name: string;
  title?: string;
  chain: string;
  icon?: string;
  rpc: string[];
  features?: Feature[];
  faucets: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  ens?: {
    registry: string;
  };
  explorers?: Explorer[];
}

export interface EthListChainIcon {
  url: string;
  width: number;
  height: number;
  format: png;
}

interface ChainMetadata {
  chain: EthListChainMetadata;
  icon?: EthListChainIcon[];
}

export interface ChainMap {
  [key: string]: ChainMetadata;
}
