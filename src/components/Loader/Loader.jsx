import React from "react";
import PropTypes from "prop-types";
import { Placeholder as SemanticPlaceholder } from "semantic-ui-react";
import styled from "styled-components";

const { Paragraph, Header, Line } = SemanticPlaceholder;

const StyledPlaceholder = styled(SemanticPlaceholder)`
  && > :before,
  && .image.header:after {
    background-color: whitesmoke;
  }
`;

const StyledLine = styled(Line)`
  &&& {
    background-color: whitesmoke;
  }
`;

const Placeholder = () => (
  <StyledPlaceholder>
    <Header image>
      <StyledLine />
      <StyledLine />
    </Header>
    <Paragraph>
      <StyledLine />
      <StyledLine />
      <StyledLine />
      <StyledLine />
    </Paragraph>
  </StyledPlaceholder>
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
  numPlaceholders: 1,
};

export default Loader;
