import React, { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import deleteIcon from "../assets/images/delete-icon.svg";
import Button from "../components/Button";
import { database } from "../services/firebase";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IButton extends ButtonProps {
  open?: boolean;
}

type ModalDeleteProps = {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  questionId?:string;
  roomId:string | undefined;
};

const ModalDelete = ({
  open,
  setOpenModal,
  roomId,
  questionId,
}: ModalDeleteProps) => {

  const [deleteQuestion, setDeleteQuestion] = React.useState(false);
  
  const handleDeleteQuestion = async (questionId?: string) => {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  };

  return (
    <Container open={open}>
      <ModalWrapper>
        <Image src={deleteIcon} alt="Deletar" />
        <h1>Encerrar sala</h1>
        <p>Tem certeza que você deseja encerrar esta sala?</p>
        <ButtonWrapper>
          <Button
            style={{ background: "#DBDCDD", color: "#737380", border: "none" }}
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </Button>
          <Button
            style={{ background: "#E73F5D", border: "none" }}
            onClick={() => handleDeleteQuestion(questionId)}
          >
            Sim,encerrar
          </Button>
        </ButtonWrapper>
      </ModalWrapper>
    </Container>
  );
};

const Container = styled.section<IButton>`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s ease;
  animation: anim 0.3s ease forwards;
  @keyframes anim {
    to {
      opacity: 1;
    }
  }
`;

const Image = styled.img`
  width: 48px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 6rem;
  border-radius: 10px;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(-50px);
  animation: anim 0.3s ease forwards;
  @keyframes anim {
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  h1 {
    margin-top: 16px;
  }
  p {
    margin-top: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export default ModalDelete;
