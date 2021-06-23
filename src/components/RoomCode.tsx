import React from "react";
import styled from "styled-components";
import copyImg from '../assets/images/copy.svg'

type RoomCodeProps = {
  code:string;
}

const RoomCode = (props : RoomCodeProps) => {

  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <Button onClick={copyRoomCodeToClipboard}>
      <ImageWrapper>
        <img src={copyImg} alt="Copy room code" />
      </ImageWrapper>
      <span>Sala #{props.code}</span>
    </Button>
  );
};

const Button = styled.button`
  height: 40px;
  color:${({theme}) => theme.colors.text};
  border-radius: 8px;
  overflow: hidden;
  background: ${({theme}) => theme.colors.background};
  border:1px solid ${({theme}) => theme.colors.primary};
  cursor:pointer;
  display: flex;
  align-items: center;
  span{
    display: block;
    align-self: center;
    flex:1;
    padding:0 16px 0 12px;
    width: 230px;
    font-size:1.4rem;
    font-weight:500;
  }
`;
const ImageWrapper = styled.div`
  background: ${({theme}) => theme.colors.primary};
  padding:0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export default RoomCode;
