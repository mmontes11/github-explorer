import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Label } from "semantic-ui-react";

const StarsButton = ({ viewerHasStarred, totalStars, onStar }) => (
  <Button as="div" labelPosition="right">
    <Button color="teal" onClick={() => onStar()}>
      <Icon name={viewerHasStarred ? "star" : "star outline"} />
    </Button>
    <Label as="a" basic color="teal" pointing="left">
      {totalStars}
    </Label>
  </Button>
);

StarsButton.propTypes = {
  viewerHasStarred: PropTypes.bool.isRequired,
  totalStars: PropTypes.number.isRequired,
  onStar: PropTypes.func.isRequired,
};

export default StarsButton;
