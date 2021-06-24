import styled from 'styled-components'

export const Container = styled.div`

`
export const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  @media (max-width:739px){
    max-width: 300px;
  }
  
`
export const RoomTitleContainer = styled.div`
  margin:32px 0 24px;
  display: flex;
  align-items: center;
`