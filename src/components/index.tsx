import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

export const TextFieldContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: left;
  margin-bottom: 15px;
`;

export const SelectContainer = styled(TextFieldContainer)`
  *:first-child {
    margin-right: 5px;
  }
`;
