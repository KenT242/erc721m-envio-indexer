import { CollectionEntity } from "generated";
import {
  DeployedContext,
  DeployedEventLog,
  INITIAL_COLLECTION,
} from "../constants";
import { getCollectionId } from "../utils";
import { getFactoryId } from "../../utils";
import { getContractMetadata } from "../../../getContractMetadata";
import { Address } from "viem";
import { createMetadata } from "./createMetadata";

export async function createDeployedCollection(
  event: DeployedEventLog,
  context: DeployedContext,
  { parent }: { parent: string }
) {
  const id = getCollectionId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const { chainId, blockNumber } = event;

  const address = event.params.collection as Address;

  const { name, symbol, maxSupply, contractUri, price } =
    await getContractMetadata({
      chainId,
      address,
      blockNumber: BigInt(blockNumber),
    });

  const metadata = await createMetadata({
    id,
    contractUri,
    blockNumber: currentBlock,
    blockTimestamp: currentTime,
  });

  const collection: CollectionEntity = {
    ...INITIAL_COLLECTION,
    id,
    chain: BigInt(event.chainId),
    address: event.params.collection,
    creator_id: event.params.deployer,
    owner_id: event.params.deployer,
    factory_id: getFactoryId(event),
    parent_id: parent,
    isErc721m: true,
    name,
    symbol,
    maxSupply,
    metadataUri: contractUri,
    metadata_id: id,
    createdAt: currentTime,
    createdBlock: currentBlock,
    updatedAt: currentTime,
    updatedBlock: currentBlock,
  };

  return {
    metadata,
    collection,
  };
}
