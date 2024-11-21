import { CustomMintRepricedEntity } from "generated";
import { nftListRepricedEventLog } from "../constants";
import { getCollectionId } from "../../utils";

const INITIAL_LIST_REPRICED_EVENT: CustomMintRepricedEntity = {
  id: "",
  chain: 0n,
  price: 0n,
  listId: 0n,
  eventsSummary: "",
  createdAt: 0n,
  createdBlock: 0n,
};

export function createListRepricedEvent({
  event,
}: {
  event: nftListRepricedEventLog;
}): CustomMintRepricedEntity {
  const collection_id = getCollectionId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const listRepricedEvent: CustomMintRepricedEntity = {
    ...INITIAL_LIST_REPRICED_EVENT,
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    listId: BigInt(event.params.listId),
    // price: BigInt(event.params.price),
    eventsSummary: collection_id,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  return listRepricedEvent;
}
