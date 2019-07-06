import React from "react";
import PropTypes from "prop-types";
import "./Repository.css";

const Repository = ({
  repository: {
    id,
    name,
    url,
    viewerHasStarred,
    stargazers: { totalCount: totalStars },
  },
  onToggleStarRepository,
}) => (
  <div className="repository">
    <div className="repository-name-stars">
      <a href={url} target="blank">
        {name}
      </a>
      <span>{`${totalStars} ✨`}</span>
    </div>
    <button type="button" className="start-button" onClick={() => onToggleStarRepository(id, viewerHasStarred)}>
      {viewerHasStarred ? "⭐ Unstar" : "⭐ Star"}
    </button>
  </div>
);

Repository.propTypes = {
  repository: PropTypes.shape({}).isRequired,
  onToggleStarRepository: PropTypes.func.isRequired,
};

export default Repository;
