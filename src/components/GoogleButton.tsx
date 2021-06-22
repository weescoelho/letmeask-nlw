import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import googleIconImg from "../assets/images/google-icon.svg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const GoogleButton: React.FC<ButtonProps> = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props}>
      <img src={googleIconImg} alt="" />
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  margin-top: 64px;
  height: 50px;
  border-radius:8px;
  font-weight:500;
  background:#ea4335;
  color:#fff;
  cursor: pointer;
  border:none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter .3s ease;
  img{
    margin-right: 8px ;
  }
  &:hover{
    filter:brightness(0.9)
  }
`;

export default GoogleButton;
