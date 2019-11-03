import React from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import styled from "styled-components";
import StarsButton from "./StarsButton/StarsButton";
import WatchersButton from "./WatchersButton/WatchersButton";

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
    owner: { login, url: repositoryOwnerUrl },
    viewerHasStarred,
    stargazers: { totalCount: totalStars },
    viewerCanSubscribe,
    viewerSubscription,
    watchers: { totalCount: totalWatchers },
  },
}) => (
  <Card>
    <Content>
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
        <StarsButton id={id} viewerHasStarred={viewerHasStarred} totalStars={totalStars} />
        <WatchersButton
          id={id}
          viewerCanSubscribe={viewerCanSubscribe}
          viewerSubscription={viewerSubscription}
          totalWatchers={totalWatchers}
        />
      </ActionsContainer>
    </Content>
  </Card>
);

Repository.propTypes = {
  repository: PropTypes.shape({}).isRequired,
};

export default Repository;
