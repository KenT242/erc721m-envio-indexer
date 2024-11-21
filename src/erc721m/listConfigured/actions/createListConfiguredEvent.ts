import { CustomMintConfiguredEntity } from "generated";
import { nftListConfiguredEventLog } from "../constants";
import { getCollectionId } from "../../utils";

const INITIAL_LIST_CONFIGURED_EVENT: CustomMintConfiguredEntity = {
  id: "",
  chain: 0n,
  amount: 0n,
  price: 0n,
  listId: 0n,
  merkleRoot: "",
  eventsSummary: "",
  createdAt: 0n,
  createdBlock: 0n,
};

export function createListConfiguredEvent({
  event,
}: {
  event: nftListConfiguredEventLog;
}): CustomMintConfiguredEntity {
  const collection_id = getCollectionId(event);

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const listConfiguredEvent: CustomMintConfiguredEntity = {
    ...INITIAL_LIST_CONFIGURED_EVENT,
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    listId: BigInt(event.params.listId),
    amount: BigInt(event.params.amount),
    merkleRoot: event.params.merkleRoot,
    // price: BigInt(event.params.price),
    eventsSummary: collection_id,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  return listConfiguredEvent;
}
