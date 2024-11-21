import { createOrUpdateFromUser } from "./actions/createOrUpdateFromUser";
import { createOrUpdateToUser } from "./actions/createOrUpdateToUser";
import { createOrUpdateToken } from "./actions/createOrUpdateToken";
import { createTransferEvent } from "./actions/createTransferEvent";
import { updateTransferSummary } from "./actions/updateTransferSummary";
import { nftTransferContext, nftTransferEventLog } from "./constants";

export async function nftTransferHandler({
  event,
  context,
}: {
  event: nftTransferEventLog;
  context: nftTransferContext;
}) {
  const summary = await updateTransferSummary(event, context);

  const transferEvent = createTransferEvent({ event });

  const fromUser = await createOrUpdateFromUser({ event, context });
  const toUser = await createOrUpdateToUser({ event, context });

  const { token, metadata } = await createOrUpdateToken({ event, context });

  context.NftSummary.set(summary);
  context.Transfer.set(transferEvent);
  context.User.set(fromUser);
  context.User.set(toUser);

  if (metadata) {
    context.TokenMetadata.set(metadata);
  }

  context.Token.set(token);
}
