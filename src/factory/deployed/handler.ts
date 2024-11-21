import { CollectionEntity } from "generated";
import { createOrUpdateParent } from "./actions/createOrUpdateParent";
import { DeployedEventLog, DeployedContext } from "./constants";
import { getCollectionId } from "./utils";
import { createDeployedEvent } from "./actions/createDeployedEvent";
import { updateDeployedSummary } from "./actions/updateDeployedSummary";
import { createDeployedCollection } from "./actions/createDeployedCollection";
import { createOrUpdateUser } from "./actions/createOrUpdateUser";

export async function deployedHandler({
  event,
  context,
}: {
  event: DeployedEventLog;
  context: DeployedContext;
}) {
  const summary = await updateDeployedSummary(event, context);

  const deployed = createDeployedEvent(event);

  const { parentMetadata, parent } = await createOrUpdateParent(event, context);

  const user = await createOrUpdateUser(event, context);

  const { metadata, collection } = await createDeployedCollection(
    event,
    context,
    {
      parent: parent.id,
    }
  );

  context.FactorySummary.set(summary);
  context.CollectionDeployed.set(deployed);

  if (parentMetadata) {
    context.ContractMetadata.set(parentMetadata);
  }
  context.Collection.set(parent);
  context.ContractMetadata.set(metadata);
  context.Collection.set(collection);
  context.User.set(user);
}
