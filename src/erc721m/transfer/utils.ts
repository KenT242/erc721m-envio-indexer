import { nftTransferEventLog } from "./constants";

export const getTokenId = (event: nftTransferEventLog) => {
  return `${event.chainId}_${event.srcAddress}_${event.params.id}`;
};