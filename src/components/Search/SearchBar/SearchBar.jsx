import React from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import Divider from "components/ui/Divider/Divider";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchBar = ({ input, loading, onChange, onSubmit }) => (
  <>
    <SearchContainer>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Repositories"
          size="big"
          icon="search"
          loading={loading}
          onChange={onChange}
          value={input}
        />
      </form>
    </SearchContainer>
    <Divider />
  </>
);

SearchBar.propTypes = {
  input: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  input: "",
};

export default SearchBar;
