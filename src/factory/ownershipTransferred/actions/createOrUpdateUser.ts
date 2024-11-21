import { UserEntity } from "generated";
import {
  OwnershipTransferredContext,
  OwnershipTransferredEventLog,
} from "../constants";
import { INITIAL_USER } from "../../../constants";

export function createOrUpdateUser(
  event: OwnershipTransferredEventLog,
  context: OwnershipTransferredContext
) {
  const currentTime = BigInt(event.blockTimestamp);

  const user = context.User.get(event.params.newOwner);
  const currentUserEntity: UserEntity = user ?? {
    ...INITIAL_USER,
    id: event.params.newOwner,
    encounteredAt: currentTime,
  };

  const nextUserEntity: UserEntity = {
    ...currentUserEntity,
    updatedAt: currentTime,
  };

  return nextUserEntity;
}
