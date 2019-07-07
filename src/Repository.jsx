import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import {
  ADD_STAR,
  REMOVE_STAR,
  addStarOptimisticResponse,
  removeStarOptimisticResponse,
  addStarUpdate,
  removeStarUpdate,
} from "./apollo";
import "./Repository.css";

const Repository = ({
  repository: {
    id,
    name,
    url,
    viewerHasStarred,
    stargazers: { totalCount: totalStars },
  },
}) => (
  <div className="repository">
    <div className="repository-name-stars">
      <a href={url} target="blank">
        {name}
      </a>
      <span>{`${totalStars} ✨`}</span>
    </div>
    <Mutation
      mutation={viewerHasStarred ? REMOVE_STAR : ADD_STAR}
      variables={{ id }}
      optimisticResponse={
        viewerHasStarred
          ? removeStarOptimisticResponse(id, totalStars - 1)
          : addStarOptimisticResponse(id, totalStars + 1)
      }
      update={viewerHasStarred ? removeStarUpdate : addStarUpdate}
    >
      {mutation => (
        <button type="button" className="start-button" onClick={() => mutation(id)}>
          {viewerHasStarred ? "⭐ Unstar" : "⭐ Star"}
        </button>
      )}
    </Mutation>
  </div>
);

Repository.propTypes = {
  repository: PropTypes.shape({}).isRequired,
};

export default Repository;
