import { UserEntity } from "generated";
import { nftTransferContext, nftTransferEventLog } from "../constants";
import { INITIAL_USER } from "../../utils";

export async function createOrUpdateToUser({
  event,
  context,
}: {
  event: nftTransferEventLog;
  context: nftTransferContext;
}): Promise<UserEntity> {
  const user = await context.User.get(event.params.to);

  const currentTime = BigInt(event.blockTimestamp);

  const currentUserEntity = user ?? {
    ...INITIAL_USER,
    encounteredAt: currentTime,
  };

  const nextUserEntity = { ...currentUserEntity, updatedAt: currentTime };

  return nextUserEntity;
}
