import gql from "graphql-tag";
import { REPOSITORY_FRAGMENT } from "../../graphql/fragment";

const ADD_STAR_PAYLOAD_PROP = "addStar";
const REMOVE_STAR_PAYLOAD_PROP = "removeStar";

const toggleStar = payloadProp => gql`
  mutation($id: ID!) {
    ${payloadProp}(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    }
  }
`;

export const ADD_STAR = toggleStar(ADD_STAR_PAYLOAD_PROP);

export const REMOVE_STAR = toggleStar(REMOVE_STAR_PAYLOAD_PROP);

const toggleStarOptimisticResponse = (payloadProp, id, viewerHasStarred, totalCount) => ({
  [payloadProp]: {
    __typename: "Mutation",
    starrable: {
      __typename: "Repository",
      id,
      viewerHasStarred,
      stargazers: {
        __typename: "StargazerConnection",
        totalCount,
      },
    },
  },
});

export const addStarOptimisticResponse = (id, totalCount) =>
  toggleStarOptimisticResponse(ADD_STAR_PAYLOAD_PROP, id, true, totalCount);

export const removeStarOptimisticResponse = (id, totalCount) =>
  toggleStarOptimisticResponse(REMOVE_STAR_PAYLOAD_PROP, id, false, totalCount);

const toggleStarUpdate = (payloadProp, viewerHasStarred) => (
  client,
  {
    data: {
      [payloadProp]: {
        starrable: { id },
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
      viewerHasStarred,
    },
  });
};

export const addStarUpdate = toggleStarUpdate(ADD_STAR_PAYLOAD_PROP, true);

export const removeStarUpdate = toggleStarUpdate(REMOVE_STAR_PAYLOAD_PROP, false);
