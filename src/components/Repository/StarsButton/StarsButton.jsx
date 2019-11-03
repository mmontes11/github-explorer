import React from "react";
import PropTypes from "prop-types";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import {
  ADD_STAR,
  REMOVE_STAR,
  addStarOptimisticResponse,
  removeStarOptimisticResponse,
  addStarUpdate,
  removeStarUpdate,
} from "components/Repository/StarsButton/graphql";

const StarsButton = ({ id, viewerHasStarred, totalStars }) => {
  const document = viewerHasStarred ? REMOVE_STAR : ADD_STAR;
  const optimisticResponse = viewerHasStarred
    ? removeStarOptimisticResponse(id, totalStars - 1)
    : addStarOptimisticResponse(id, totalStars + 1);
  const update = viewerHasStarred ? removeStarUpdate : addStarUpdate;
  const [mutation] = useMutation(document, { variables: { id }, optimisticResponse, update });
  return (
    <Button as="div" labelPosition="right">
      <Button color="red" onClick={() => mutation(id)}>
        <Icon name={viewerHasStarred ? "star" : "star outline"} />
      </Button>
      <Label as="a" basic color="red" pointing="left">
        {totalStars}
      </Label>
    </Button>
  );
};

StarsButton.propTypes = {
  id: PropTypes.string.isRequired,
  viewerHasStarred: PropTypes.bool.isRequired,
  totalStars: PropTypes.number.isRequired,
};

export default StarsButton;
