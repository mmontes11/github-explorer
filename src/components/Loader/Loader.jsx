import React from "react";
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

const NUM_PLACEHOLDERS = 3;
const getPlaceholders = () => {
  const placeholders = [];
  for (let i = 0; i < NUM_PLACEHOLDERS; i += 1) {
    placeholders.push(<Placeholder key={i} />);
  }
  return placeholders;
};
const placeholders = getPlaceholders();

const Loader = () => <>{placeholders}</>;

export default Loader;
