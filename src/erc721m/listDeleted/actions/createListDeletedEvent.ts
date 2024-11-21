import { CustomMintReenabledEntity } from "generated";
import { nftListDeletedEventLog } from "../constants";
import { getCollectionId } from "../../utils";

const INITIAL_LIST_REENABLED_EVENT: CustomMintReenabledEntity = {
  id: "",
  chain: 0n,
  listId: 0n,
  eventsSummary: "",
  createdAt: 0n,
  createdBlock: 0n,
};

export function createListDeletedEvent({
  event,
}: {
  event: nftListDeletedEventLog;
}): CustomMintReenabledEntity {
  const collection_id = getCollectionId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const listDeletedEvent: CustomMintReenabledEntity = {
    ...INITIAL_LIST_REENABLED_EVENT,
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    listId: BigInt(event.params.listId),
    eventsSummary: collection_id,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  return listDeletedEvent;
}
