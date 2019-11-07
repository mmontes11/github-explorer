import React from "react";
import PropTypes from "prop-types";
import { Placeholder as SemanticPlaceholder } from "semantic-ui-react";
import styled from "styled-components";

const { Header, Line, Paragraph } = SemanticPlaceholder;

const StyledLine = styled(Line)`
  &&& {
    background-color: whitesmoke;
  }
`;

const StyledPlaceholder = styled(SemanticPlaceholder)`
  && > :before {
    background-color: whitesmoke;
  }
`;

const Placeholder = () => (
  <StyledPlaceholder>
    <Header>
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
  numPlaceholders: 3,
};

export default Loader;
