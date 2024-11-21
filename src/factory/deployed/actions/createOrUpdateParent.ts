import { CollectionEntity, ContractMetadataEntity } from "generated";
import {
  DeployedContext,
  DeployedEventLog,
  INITIAL_COLLECTION,
} from "../constants";
import { getParentId } from "../utils";
import { getContractMetadata } from "../../../getContractMetadata";
import { Address } from "viem";
import { createMetadata } from "./createMetadata";

export async function createOrUpdateParent(
  event: DeployedEventLog,
  context: DeployedContext
) {
  const id = getParentId(event);
  const parent = await context.Collection.get(id);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  let metadata: ContractMetadataEntity | undefined;
  let name: string | undefined;
  let symbol: string | undefined;
  let maxSupply: bigint | undefined;
  let contractUri: string | undefined;
  if (!parent) {
    const { chainId } = event;
    const address = event.params.aligned as Address;
    const data = await getContractMetadata({
      chainId,
      address,
      blockNumber: currentBlock,
    });
    name = data.name;
    symbol = data.symbol;
    maxSupply = data.maxSupply;
    contractUri = data.contractUri;
    metadata = await createMetadata({
      id,
      contractUri,
      blockNumber: currentBlock,
      blockTimestamp: currentTime,
    });
  }

  const currentParentEntity: CollectionEntity = parent ?? {
    ...INITIAL_COLLECTION,
    id,
    chain: BigInt(event.chainId),
    address: event.params.aligned,
    name,
    symbol,
    maxSupply,
    metadataUri: contractUri,
    metadata_id: id,
    encounteredAt: currentTime,
    encounteredBlock: currentBlock,
  };

  const nextParentEntity: CollectionEntity = {
    ...currentParentEntity,
    isParent: true,
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return { parentMetadata: metadata, parent: nextParentEntity };
}
