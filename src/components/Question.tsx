import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { database } from "../services/firebase";
import UserInfo from "./UserInfo";
import deleteImg from "../assets/images/delete.svg";
import ModalDelete from "../components/ModalDelete";

type QuestionProps = {
  admin: boolean;
  questionId?: string;
  roomId?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
  likeCount: number;
  likeId: string | undefined;
};

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  liked?: string | undefined;
};

const Question = ({
  content,
  author,
  admin,
  questionId,
  roomId,
  user,
  likeCount,
  likeId,
}: QuestionProps) => {
  const [openModal, setOpenModal] = React.useState(false);


  const handleLikeQuestion = async (
    questionId?: string,
    likeId?: string | undefined,
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

  const handleDeleteQuestion = async (questionId?: string) => {
    setOpenModal(true);
  };

  return (
    <Container>
      <ModalDelete
        open={openModal}
        setOpenModal={setOpenModal}
        questionId={questionId}
        roomId={roomId}
      />
      <Content>{content}</Content>
      <Footer>
        <WrapperUserInfo>
          <UserInfo avatar={author.avatar} username={author.name} />
        </WrapperUserInfo>
        {admin ? (
          <WrapperAdminButtons>
            <Button
              type="button"
              onClick={() => handleDeleteQuestion(questionId)}
            >
              <img src={deleteImg} alt="Remover pergunta" />
            </Button>
          </WrapperAdminButtons>
        ) : (
          <WrapperUserButtons>
            <Button
              type="button"
              aria-label="Marcar como gostei"
              liked={likeId}
              onClick={() => handleLikeQuestion(questionId)}
            >
              {likeCount > 0 && <span>{likeCount}</span>}
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

const Container = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  margin-top: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;
  & + div {
    margin-top: 8px;
  }
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
const WrapperAdminButtons = styled.div``;
const Button = styled.button<ButtonType>`
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  gap: 8px;
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
