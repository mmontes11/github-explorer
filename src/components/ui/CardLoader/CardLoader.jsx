import React from "react";
import { Placeholder as SemanticPlaceholder, Card } from "semantic-ui-react";

const { Content } = Card;
const { Paragraph, Header, Line } = SemanticPlaceholder;

const CardLoader = () => (
  <Card>
    <Content>
      <SemanticPlaceholder>
        <Header image>
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
    </Content>
  </Card>
);

export default CardLoader;
