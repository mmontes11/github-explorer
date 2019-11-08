import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import github from "assets/github.png";
import styled from "styled-components";

const { Item } = Menu;

const GitHubImage = styled(Image).attrs({ size: "mini", src: github })`
  margin-right: 1.5em;
`;

const Navbar = () => (
  <Menu fixed="top" borderless>
    <Container>
      <Item as="a" header>
        <GitHubImage />
        GitHub Explorer
      </Item>
    </Container>
  </Menu>
);

export default Navbar;
