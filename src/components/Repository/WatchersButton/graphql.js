import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "../../../graphql/fragment";

const SUBSCRIBED = "SUBSCRIBED";
const UNSUBSCRIBED = "UNSUBSCRIBED";

export const isSubscribed = viewerSubscription => viewerSubscription === SUBSCRIBED;

const updateSubscription = state => gql`
  mutation($id: ID!) {
    updateSubscription(input: { subscribableId: $id, state: ${state} }) {
      subscribable {
        id
        viewerCanSubscribe
        viewerSubscription
      }
    }
  }
`;
export const SUBSCRIBE = updateSubscription(SUBSCRIBED);
export const UNSUBSCRIBE = updateSubscription(UNSUBSCRIBED);

const updateSubscriptionOptimisticResponse = (id, viewerCanSubscribe, viewerSubscription, totalCount) => ({
  updateSubscription: {
    __typename: "Mutation",
    subscribable: {
      __typename: "Repository",
      id,
      viewerCanSubscribe,
      viewerSubscription,
      watchers: {
        __typename: "UserConnection",
        totalCount,
      },
    },
  },
});
export const subscribeOptimisticResponse = (id, viewerCanSubscribe, totalCount) =>
  updateSubscriptionOptimisticResponse(id, viewerCanSubscribe, SUBSCRIBED, totalCount);
export const unsubscribeOptimisticResponse = (id, viewerCanSubscribe, totalCount) =>
  updateSubscriptionOptimisticResponse(id, viewerCanSubscribe, UNSUBSCRIBED, totalCount);

export const updateSubscriptionUpdate = totalCount => (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerCanSubscribe, viewerSubscription },
      },
    },
  },
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      viewerCanSubscribe,
      viewerSubscription,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
};
