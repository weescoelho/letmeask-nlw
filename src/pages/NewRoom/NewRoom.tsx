import React, { FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import illustration from "../../assets/images/illustration.svg";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import useMedia from "../../hooks/useMedia";
import {
  Aside,
  AuthFormContainer,
  AuthPage,
  SectionTitle,
  Subtitle,
  Title,
  LogoPageContainer,
} from "./NewRoom.styled";
import { database } from "../../services/firebase";

const NewRoom: React.FC = () => {
  const { user } = useAuth();
  const mobile = useMedia("(max-width:739px)");
  const history = useHistory();

  const [newRoom, setNewRoom] = React.useState("");

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();
    if (newRoom.trim() === "") return;
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title:newRoom,
      authorId: user?.id,
    })
    history.push(`/rooms/${firebaseRoom.key}`)
  };

  return (
    <AuthPage>
      {!mobile && (
        <Aside>
          <img
            src={illustration}
            alt="Ilustração simbolizando perguntas e respostas"
          />
          <Title>Toda pergunta tem uma resposta.</Title>
          <Subtitle>
            Aprenda e compartilhe conhecimento com outras pessoas
          </Subtitle>
        </Aside>
      )}
      <AuthFormContainer>
        <div>
          <LogoPageContainer>
            <Logo />
          </LogoPageContainer>
          <SectionTitle>Crie uma nova sala</SectionTitle>
          <form onSubmit={handleCreateRoom}>
            <Input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit" style={{ marginTop: "16px" }}>
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </AuthFormContainer>
    </AuthPage>
  );
};

export default NewRoom;
