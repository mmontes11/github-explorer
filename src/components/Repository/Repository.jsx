import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import {
  ADD_STAR,
  REMOVE_STAR,
  addStarOptimisticResponse,
  removeStarOptimisticResponse,
  addStarUpdate,
  removeStarUpdate,
} from "../../graphql/apollo";
import "./Repository.css";

const Repository = ({
  repository: {
    id,
    name,
    url,
    viewerHasStarred,
    stargazers: { totalCount: totalStars },
  },
}) => {
  const document = viewerHasStarred ? REMOVE_STAR : ADD_STAR;
  const optimisticResponse = viewerHasStarred
    ? removeStarOptimisticResponse(id, totalStars - 1)
    : addStarOptimisticResponse(id, totalStars + 1);
  const update = viewerHasStarred ? removeStarUpdate : addStarUpdate;
  const [mutation] = useMutation(document, { variables: { id }, optimisticResponse, update });
  return (
    <div className="repository">
      <div className="repository-name-stars">
        <a href={url} target="blank">
          {name}
        </a>
        <span>{`${totalStars} ✨`}</span>
      </div>
      <button type="button" onClick={() => mutation(id)}>
        {viewerHasStarred ? "⭐ Unstar" : "⭐ Star"}
      </button>
    </div>
  );
};

Repository.propTypes = {
  repository: PropTypes.shape({}).isRequired,
};

export default Repository;
