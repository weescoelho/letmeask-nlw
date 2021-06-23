import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({children, ...props } : ButtonProps) => {
  return (
    <ButtonElement {...props}>
      {children}
    </ButtonElement>
  );
};

const ButtonElement = styled.button`
  width: 100%;
  height: 50px;
  border-radius:8px;
  font-weight:500;
  background:${({theme}) => theme.colors.primary};
  color:#fff;
  cursor: pointer;
  border:none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter .3s ease;
  padding: 0px 32px;
  img{
    margin-right: 8px ;
  }
  &:not(:disabled):hover{
    filter:brightness(0.9)
  }
  &:disabled{
    opacity: 0.6;
    cursor:not-allowed;
  }
`;

export default Button;
