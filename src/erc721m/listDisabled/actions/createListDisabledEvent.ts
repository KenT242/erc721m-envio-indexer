import { CustomMintDisabledEntity } from "generated";
import { nftListDisabledEventLog } from "../constants";
import { getCollectionId } from "../../utils";

const INITIAL_LIST_DISABLED_EVENT: CustomMintDisabledEntity = {
  id: "",
  chain: 0n,
  listId: 0n,
  eventsSummary: "",
  createdAt: 0n,
  createdBlock: 0n,
};

export function createListDisabledEvent({
  event,
}: {
  event: nftListDisabledEventLog;
}): CustomMintDisabledEntity {
  const collection_id = getCollectionId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const listDisabledEvent: CustomMintDisabledEntity = {
    ...INITIAL_LIST_DISABLED_EVENT,
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    listId: BigInt(event.params.listId),
    eventsSummary: collection_id,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  return listDisabledEvent;
}
