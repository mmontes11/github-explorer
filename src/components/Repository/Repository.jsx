import React from "react";
import PropTypes from "prop-types";
import { Card } from "semantic-ui-react";
import StarsButton from "./StarsButton/StarsButton";
import WatchersButton from "./WatchersButton/WatchersButton";
import "./Repository.css";

const { Content, Header, Meta, Description } = Card;

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
      <div className="ui two">
        <StarsButton id={id} viewerHasStarred={viewerHasStarred} totalStars={totalStars} />
        <WatchersButton
          id={id}
          viewerCanSubscribe={viewerCanSubscribe}
          viewerSubscription={viewerSubscription}
          totalWatchers={totalWatchers}
        />
      </div>
    </Content>
  </Card>
);

Repository.propTypes = {
  repository: PropTypes.shape({}).isRequired,
};

export default Repository;
