import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import {
  isSubscribed,
  SUBSCRIBE,
  UNSUBSCRIBE,
  subscribeOptimisticResponse,
  unsubscribeOptimisticResponse,
  updateSubscriptionUpdate,
} from "components/Repository/WatchersButton/graphql";

const WatchersButton = ({ id, viewerCanSubscribe, viewerSubscription, totalWatchers }) => {
  const isViewerSubscribed = isSubscribed(viewerSubscription);
  const newTotalWatchers = isViewerSubscribed ? totalWatchers - 1 : totalWatchers + 1;
  const document = isViewerSubscribed ? UNSUBSCRIBE : SUBSCRIBE;
  const optimisticResponse = isViewerSubscribed
    ? unsubscribeOptimisticResponse(id, viewerCanSubscribe, newTotalWatchers)
    : subscribeOptimisticResponse(id, viewerCanSubscribe, newTotalWatchers);
  const update = updateSubscriptionUpdate(newTotalWatchers);
  const [mutation] = useMutation(document, { variables: { id }, optimisticResponse, update });
  return (
    <Button as="div" labelPosition="right">
      <Button color="blue" disabled={!viewerCanSubscribe} onClick={() => mutation(id)}>
        <Icon name={isViewerSubscribed ? "eye slash" : "eye"} />
      </Button>
      <Label as="a" basic color="blue" pointing="left">
        {totalWatchers}
      </Label>
    </Button>
  );
};

WatchersButton.propTypes = {
  id: PropTypes.string.isRequired,
  viewerCanSubscribe: PropTypes.bool.isRequired,
  viewerSubscription: PropTypes.string.isRequired,
  totalWatchers: PropTypes.number.isRequired,
};

export default WatchersButton;
