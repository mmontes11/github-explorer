import React from "react";
import PropTypes from "prop-types";
import { Placeholder as SemanticPlaceholder } from "semantic-ui-react";

const { Header, Line, Paragraph } = SemanticPlaceholder;

const Placeholder = () => (
  <SemanticPlaceholder>
    <Header>
      <Line />
      <Line />
    </Header>
    <Paragraph>
      <Line />
      <Line />
      <Line />
      <Line />
    </Paragraph>
  </SemanticPlaceholder>
);

const getPlaceholders = numPlaceholders => {
  const placeholders = [];
  for (let i = 0; i < numPlaceholders; i += 1) {
    placeholders.push(<Placeholder key={i} />);
  }
  return placeholders;
};

const Loader = ({ numPlaceholders }) => <>{getPlaceholders(numPlaceholders)}</>;

Loader.propTypes = {
  numPlaceholders: PropTypes.number,
};

Loader.defaultProps = {
  numPlaceholders: 3,
};

export default Loader;
