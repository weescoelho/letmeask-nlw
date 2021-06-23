import styled from 'styled-components'

export const Container = styled.div`
`
export const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  
`
export const RoomTitleContainer = styled.div`
  margin:32px 0 24px;
  display: flex;
  align-items: center;
`
export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  span{
    font-size:1.4rem;
    color:#737380;
    font-weight:500;
    button{
      background: transparent;
      width: fit-content !important;
      border:none;
      color:${({theme}) => theme.title === 'light' ? theme.colors.primary : '#D67EE2'};
      text-decoration:underline;
      font-size:1.4rem;
      font-weight: 500;
      cursor:pointer;
    }
  }
`
