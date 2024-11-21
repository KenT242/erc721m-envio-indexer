import { Chain, createPublicClient, http } from "viem";
import { sepolia, mainnet } from "viem/chains";
// import { normalize } from "viem/ens";
// import { addEnsContracts, ensPublicActions } from "@ensdomains/ensjs";
// import { getName } from "@ensdomains/ensjs/public";

const MAINNET_RPC_ENDPOINT =
  process.env.MAINNET_RPC_URL || "https://ethereum-rpc.publicnode.com";
const SEPOLIA_RPC_ENDPOINT =
  process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";

export function getClient(chainId: number) {
  let chain: Chain = mainnet;
  let rpcUrl: string | undefined;

  if (chainId == 1) {
    chain = mainnet;
    rpcUrl = MAINNET_RPC_ENDPOINT;
  }

  if (chainId == 11155111) {
    chain = sepolia;
    rpcUrl = SEPOLIA_RPC_ENDPOINT;
  }

  return createPublicClient({
    chain: chain,
    transport: http(rpcUrl),
    batch: {
      multicall: true,
    },
  });
}
