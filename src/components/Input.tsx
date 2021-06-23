import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";



type ButtonProps = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<ButtonProps> = ({ placeholder,  ...props } : ButtonProps) => {
  return <InputElement placeholder={placeholder} {...props}/>;
};

const InputElement = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid #a8a8d3;
  color:${({ theme }) => theme.colors.text};
`;

export default Input;
