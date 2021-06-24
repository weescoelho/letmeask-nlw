import React from "react";
import styled from "styled-components";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = styled.textarea`
  width: 100%;
  border: 0;
  padding: 16px;
  border-radius: 8px;
  color:${({theme}) => theme.colors.text};
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  resize: vertical;
  min-height:130px;
`;

const InputTextarea: React.FC<Props> = ({ ...props }) => {
  return <Textarea {...props} />;
};

export default InputTextarea;
