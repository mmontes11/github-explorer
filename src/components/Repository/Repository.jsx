import React from "react";
import PropTypes from "prop-types";
import { Card, Image } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import {
  ADD_STAR,
  REMOVE_STAR,
  addStarOptimisticResponse,
  removeStarOptimisticResponse,
  addStarUpdate,
  removeStarUpdate,
} from "components/Repository/starrable.graphql";
import {
  isSubscribed,
  SUBSCRIBE,
  UNSUBSCRIBE,
  subscribeOptimisticResponse,
  unsubscribeOptimisticResponse,
  updateSubscriptionUpdate,
} from "components/Repository/suscribable.graphql";
import StarsButton from "components/Repository/StarsButton/StarsButton";
import WatchersButton from "components/Repository/WatchersButton/WatchersButton";

const { Content, Header, Meta, Description } = Card;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Repository = ({
  repository: {
    id,
    name,
    description,
    url,
    owner: { login, url: repositoryOwnerUrl, avatarUrl },
    viewerHasStarred,
    stargazers: { totalCount: totalStars },
    viewerCanSubscribe,
    viewerSubscription,
    watchers: { totalCount: totalWatchers },
  },
}) => {
  const starrableOperation = viewerHasStarred ? REMOVE_STAR : ADD_STAR;
  const starrableOR = viewerHasStarred
    ? removeStarOptimisticResponse(id, totalStars - 1)
    : addStarOptimisticResponse(id, totalStars + 1);
  const starrableUpdate = viewerHasStarred ? removeStarUpdate : addStarUpdate;
  const [starrableMutation] = useMutation(starrableOperation, {
    variables: { id },
    optimisticResponse: starrableOR,
    update: starrableUpdate,
  });

  const isViewerSubscribed = isSubscribed(viewerSubscription);
  const newTotalWatchers = isViewerSubscribed ? totalWatchers - 1 : totalWatchers + 1;
  const suscribableOperation = isViewerSubscribed ? UNSUBSCRIBE : SUBSCRIBE;
  const suscribableOR = isViewerSubscribed
    ? unsubscribeOptimisticResponse(id, viewerCanSubscribe, newTotalWatchers)
    : subscribeOptimisticResponse(id, viewerCanSubscribe, newTotalWatchers);
  const suscribableUpdate = updateSubscriptionUpdate(newTotalWatchers);
  const [suscribableMutation] = useMutation(suscribableOperation, {
    variables: { id },
    optimisticResponse: suscribableOR,
    update: suscribableUpdate,
  });

  return (
    <Card>
      <Content>
        <Image floated="left" size="mini" src={avatarUrl} />
        <Header>
          <a href={url} target="blank">
            {name}
          </a>
        </Header>
        <Meta>
          <a href={repositoryOwnerUrl} target="blank">
            {login}
          </a>
        </Meta>
        <Description>{description}</Description>
      </Content>
      <Content extra>
        <ActionsContainer>
          <StarsButton
            viewerHasStarred={viewerHasStarred}
            totalStars={totalStars}
            onStar={() => starrableMutation(id)}
          />
          <WatchersButton
            isViewerSubscribed={isViewerSubscribed}
            viewerCanSubscribe={viewerCanSubscribe}
            totalWatchers={totalWatchers}
            onWatch={() => suscribableMutation(id)}
          />
        </ActionsContainer>
      </Content>
    </Card>
  );
};

Repository.propTypes = {
  repository: PropTypes.shape({}).isRequired,
};

export default Repository;
