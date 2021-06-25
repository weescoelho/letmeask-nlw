import styled from 'styled-components';

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 3.6rem;
  line-height: 4.2rem;
  max-width: 440px;
`;

export const Subtitle = styled.h2`
  color: #f8f8f8;
  font-size: 2.4rem;
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  opacity: 0.7;
  max-width: 450px;
  margin-top: 16px;
`;

export const AuthPage = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
  main {
  }
`;

export const Aside = styled.div`
  flex: 7;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 80px;
  img {
    max-width: 320px;
    margin-bottom: 32px;
  }
`;

export const AuthFormContainer = styled.main`
  flex: 10;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  div{
    display: flex;
    flex-direction:column;
    width: 100%;
    max-width: 320px;
    align-items: stretch;
    text-align: center;
    justify-content: center;
  }
`;

export const Separator = styled.div`
  font-size:14px;
  color:#A8A8B3;
  margin:32px 0;
  display: flex;
  align-items: center;
  &::before{
    content:'';
    flex:1;
    height: 1px;
    background-color:#A8A8B3;
    margin-right: 16px;
  }
  &::after{
    content:'';
    flex:1;
    height: 1px;
    background:#A8A8B3;
    margin-left: 16px;
  }
`
export const LogoPageContainer = styled.div`
  width: 100%;
  display: flex !important;
  align-items: center !important;
`

export const SwitchContainer = styled.div`
  position: absolute;
  top:40px;
  right:40px;
`