import { nftListDisabledEventLog } from "./constants";

export const getListId = (event: nftListDisabledEventLog) => {
  return `${event.chainId}_${event.srcAddress}_${event.params.listId}`;
};
