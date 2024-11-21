import { nftListConfiguredEventLog } from "./constants";

export const getListId = (event: nftListConfiguredEventLog) => {
  return `${event.chainId}_${event.srcAddress}_${event.params.listId}`;
};
