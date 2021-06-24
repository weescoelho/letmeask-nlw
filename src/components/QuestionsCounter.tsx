import React from "react";
import styled from "styled-components";

const Container = styled.span`
  margin-left: 16px;
  background: #FC7753;
  border-radius: 9999px;
  padding: 8px 16px;
  color: #fff;
`;

type Props = {
  questions: number;
};

const QuestionsCounter = ({ questions }: Props) => {
  return (
    <Container>
      {questions} {questions > 1 ? "perguntas" : "pergunta"}
    </Container>
  );
};

export default QuestionsCounter;
