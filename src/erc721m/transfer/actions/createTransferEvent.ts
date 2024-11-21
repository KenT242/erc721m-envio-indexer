import { TransferEntity } from "generated";
import { nftTransferEventLog } from "../constants";
import { getCollectionId } from "../../utils";
import { getTokenId } from "../utils";
import { zeroAddress } from "viem";

const INITIAL_TRANSFER_EVENT: TransferEntity = {
  id: "",
  chain: 0n,
  caller_id: "",
  from_id: "",
  to_id: "",
  collection_id: "",
  token_id: "",
  eventsSummary: "",
  createdAt: 0n,
  createdBlock: 0n,
};

export function createTransferEvent({
  event,
}: {
  event: nftTransferEventLog;
}): TransferEntity {
  const collection_id = getCollectionId(event);
  const token_id = getTokenId(event);
  const { from: from_id, to: to_id } = event.params;
  const caller_id = event.txOrigin || zeroAddress;

  const currentTime = BigInt(event.blockTimestamp);
  const currentBlock = BigInt(event.blockNumber);

  const transferEvent: TransferEntity = {
    ...INITIAL_TRANSFER_EVENT,
    id: event.transactionHash + event.logIndex.toString(),
    chain: BigInt(event.chainId),
    eventsSummary: collection_id,
    caller_id,
    from_id,
    to_id,
    collection_id,
    token_id,
    createdAt: currentTime,
    createdBlock: currentBlock,
  };

  return transferEvent;
}
