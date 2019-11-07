import gql from "graphql-tag";
import { IMAGE_SIZE } from "constants/index";

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
    id
    name
    description
    url
    owner {
      login
      url
      avatarUrl(size: ${IMAGE_SIZE})
    }
    viewerHasStarred
    stargazers {
      totalCount
    }
    viewerCanSubscribe
    viewerSubscription
    watchers {
      totalCount
    }
  }
`;
