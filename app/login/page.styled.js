import styled from 'styled-components';

export const LoginStyled = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  label {
    &::before {
      content: "" !important;
    }
  }
`;
