import styled from 'styled-components';

const WrapperStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p:first-child {
    font-size: 3rem;
    font-weight: 500;
    border-right: 1px solid #000;
    padding-right: 20px;
  }

  p:nth-child(2) {
    font-size: 2rem;
    padding-left: 20px;
  }
`;

export default function Custom404() {
  return (
    <WrapperStyles>
      <p>404</p>
      <p>This page could not be found.</p>
    </WrapperStyles>
  );
}
