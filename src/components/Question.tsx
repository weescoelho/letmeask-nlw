import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { database } from "../services/firebase";
import UserInfo from "./UserInfo";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import ModalDelete from "../components/ModalDelete";

type QuestionProps = {
  question: {
    id: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    likeCount: number;
    likeId: string | undefined;
    isHighlighted: boolean;
    isAnswered: boolean;
  };
  admin: boolean;
  roomId: string;
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
};

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  liked?: string;
};

type ContainerProps = {
  highlighted?: boolean;
  answered?: boolean;
};

const Question = ({ admin, roomId, user, question }: QuestionProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleLikeQuestion = async (
    questionId: string,
    likeId: string | undefined,
  ) => {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  };

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    setOpenModal(true);
  };

  return (
    <Container
      highlighted={question.isHighlighted}
      answered={question.isAnswered}
    >
      <ModalDelete
        open={openModal}
        setOpenModal={setOpenModal}
        questionId={question.id}
        roomId={roomId}
      />
      <Content>{question.content}</Content>
      <Footer>
        <WrapperUserInfo>
          <UserInfo
            avatar={question.author.avatar}
            username={question.author.name}
          />
        </WrapperUserInfo>
        {admin ? (
          <WrapperAdminButtons>
            <Button
              type="button"
              onClick={() => handleCheckQuestionAsAnswered(question.id)}
            >
              <img src={checkImg} alt="Marcar uma pergunta como respondida" />
            </Button>
            <Button
              type="button"
              onClick={() => handleHighlightQuestion(question.id)}
            >
              <img src={answerImg} alt="Dar destaque à uma pergunta" />
            </Button>
            <Button
              type="button"
              onClick={() => handleDeleteQuestion(question.id)}
            >
              <img src={deleteImg} alt="Remover pergunta" />
            </Button>
          </WrapperAdminButtons>
        ) : (
          <WrapperUserButtons>
            <Button
              type="button"
              aria-label="Marcar como gostei"
              liked={question.likeId}
              onClick={() => handleLikeQuestion(question.id, question.likeId)}
            >
              {question.likeCount > 0 && <span>{question.likeCount}</span>}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                  stroke="#737380"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </WrapperUserButtons>
        )}
      </Footer>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  background: ${({ theme, highlighted }) =>
    highlighted ? theme.colors.highlighted : theme.colors.secondary};
  margin-top: 32px;
  border-radius: 8px;
  border: 1px solid
    ${({ highlighted, theme }) => (highlighted ? theme.colors.primary : "none")};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + div {
    margin-top: 8px;
  }
  background: ${({ theme, answered }) =>
    answered ? theme.colors.lightGray : theme.colors.secondary};
`;

const Content = styled.p`
  color: ${({ theme }) => theme.colors.text};
`;
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const WrapperUserInfo = styled.div``;
const WrapperUserButtons = styled.div``;
const WrapperAdminButtons = styled.div`
  display: flex;
  gap: 16px;
`;
const Button = styled.button<ButtonType>`
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  transition: filter 0.3s ease;
  color: ${({ theme, liked }) =>
    liked ? theme.colors.primary : theme.colors.gray};
  svg path {
    stroke: ${({ theme, liked }) =>
      liked ? theme.colors.primary : theme.colors.gray};
  }
  &:hover {
    filter: brightness(0.7);
  }
`;

export default Question;
