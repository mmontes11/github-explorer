import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Label } from "semantic-ui-react";

const WatchersButton = ({ isViewerSubscribed, viewerCanSubscribe, totalWatchers, onWatch }) => (
  <Button as="div" labelPosition="right">
    <Button color="teal" disabled={!viewerCanSubscribe} onClick={() => onWatch()}>
      <Icon name={isViewerSubscribed ? "eye slash" : "eye"} />
    </Button>
    <Label as="a" basic pointing="left">
      {totalWatchers}
    </Label>
  </Button>
);

WatchersButton.propTypes = {
  isViewerSubscribed: PropTypes.bool.isRequired,
  viewerCanSubscribe: PropTypes.bool.isRequired,
  totalWatchers: PropTypes.number.isRequired,
  onWatch: PropTypes.func.isRequired,
};

export default WatchersButton;
