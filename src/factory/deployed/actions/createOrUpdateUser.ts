import { UserEntity } from "generated";
import { DeployedContext, DeployedEventLog } from "../constants";
import { INITIAL_USER } from "../../../constants";

export async function createOrUpdateUser(
  event: DeployedEventLog,
  context: DeployedContext
) {
  const currentTime = BigInt(event.blockTimestamp);

  const user = await context.User.get(event.params.deployer);
  const currentUserEntity: UserEntity = user ?? {
    ...INITIAL_USER,
    id: event.params.deployer,
    encounteredAt: currentTime,
  };

  const nextUserEntity: UserEntity = {
    ...currentUserEntity,
    updatedAt: currentTime,
  };

  return nextUserEntity;
}
