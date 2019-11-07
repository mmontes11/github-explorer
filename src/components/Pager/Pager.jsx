import React from "react";
import PropTypes from "prop-types";
import { Divider, Label, Button } from "semantic-ui-react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 3em;
  margin-bottom: 3em;
`;

const PagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled(Label)`
  && {
    margin-right: 1em;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-left: 1em;
  }
`;

const Pager = ({ progress, total, loading, hasNextPage, onFetchMore }) => (
  <Container>
    <Divider />
    <PagesContainer>
      <StyledLabel>
        {progress} / {total}
      </StyledLabel>
      {hasNextPage && <StyledButton circular loading={loading} icon="plus" onClick={() => onFetchMore()} />}
    </PagesContainer>
  </Container>
);

Pager.propTypes = {
  progress: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  onFetchMore: PropTypes.func.isRequired,
};

export default Pager;
