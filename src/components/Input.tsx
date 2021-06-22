import React from "react";
import styled from "styled-components";

interface Props {
  placeholder?: string;
  type: string;
}

const Input: React.FC<Props> = ({ placeholder, type = "text" }) => {
  return <InputElement type={type} placeholder={placeholder} />;
};

const InputElement = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid #a8a8d3;
`;

export default Input;
