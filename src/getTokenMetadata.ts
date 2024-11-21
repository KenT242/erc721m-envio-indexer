import { Abi, Address, parseAbi, parseAbiItem } from "viem";
import { getClient } from "./client";
import erc721mAbi from "../abis/erc721m.json";

export async function getTokenMetadata({
  chainId,
  address,
  tokenId,
  blockNumber,
}: {
  chainId: number;
  address: Address;
  tokenId: bigint;
  blockNumber?: bigint;
}) {
  const client = getClient(chainId);

  const config = {
    blockNumber,
    address,
  };

  let contracts = [
    { ...config, functionName: "tokenURI", arguments: [tokenId] },
  ];

  try {
    const [uri] = await client.multicall({
      batchSize: 10,
      contracts: [
        {
          address,
          functionName: "tokenURI",
          abi: parseAbi([
            "function tokenURI(uint256 tokenId) external view returns (string memory)",
          ]),
          args: [tokenId],
        },
      ],
    });
    return uri?.result as string | undefined;
  } catch (e) {
    console.error(e);
  }

  return undefined;
}
