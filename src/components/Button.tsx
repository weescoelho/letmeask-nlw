import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

interface IButton extends ButtonProps {
  outline?:boolean;
}

const Button: React.FC<IButton> = ({children, outline, ...props } : IButton) => {
  return (
    <ButtonElement outline={outline} {...props}>
      {children}
    </ButtonElement>
  );
};

const ButtonElement = styled.button<IButton>`
  width: 100%;
  height: 50px;
  border-radius:8px;
  font-weight:500;
  background:${({theme, outline}) => outline ? 'transparent' : theme.colors.primary };
  border: 1px solid ${({theme}) => theme.colors.primary};
  color:${({theme,outline}) => outline ? theme.colors.primary : '#fff'};
  cursor: pointer;
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
