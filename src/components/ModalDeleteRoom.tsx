import React, { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
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
  roomId: string | undefined;
};

const ModalDeleteRoom = ({ open, setOpenModal, roomId }: ModalDeleteProps) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const handleEndRoom = async (roomId?: string) => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    addToast("A sala foi encerrada com sucesso!", {
      appearance: "success",
      autoDismiss: true,
    });
    history.push("/");
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
            onClick={() => handleEndRoom(roomId)}
          >
            Sim, encerrar.
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

export default ModalDeleteRoom;
