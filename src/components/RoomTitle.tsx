import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size:24px;
  color:${({theme}) => theme.colors.text};
`
type Props = {
  title:string;
}

const RoomTitle = ({title}: Props) => {
  return (
    <Title>Sala {title}</Title>
  )
}

export default RoomTitle
