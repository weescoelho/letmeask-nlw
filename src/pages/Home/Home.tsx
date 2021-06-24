import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../../services/firebase";
import illustration from "../../assets/images/illustration.svg";
import login from "../../assets/images/login.svg";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import GoogleButton from "../../components/GoogleButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import useMedia from "../../hooks/useMedia";
import {
  Aside,
  AuthFormContainer,
  AuthPage,
  Separator,
  Subtitle,
  Title,
  LogoPageContainer,
} from "./Home.styled";

const Home = () => {
  const history = useHistory();
  const mobile = useMedia("(max-width:739px)");
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = React.useState("");

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  };

  // Verificação se a sala existe.
  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();
    if(roomCode.trim() === '') return;
    const roomRef = database.ref(`rooms/${roomCode}`).get()
    if(!(await roomRef).exists()){
      alert('Room does not exists')
      return;
    }
    if((await roomRef).val().endedAt){
      alert('Room already closed.')
      return;
    }
    history.push((`rooms/${roomCode}`))
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
          <GoogleButton onClick={handleCreateRoom}>
            Crie sua sala com o Google
          </GoogleButton>
          <Separator> ou entre em uma sala</Separator>
          <form onSubmit={handleJoinRoom}>
            <Input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit" style={{ marginTop: "16px" }}>
              <img src={login} alt="" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </AuthFormContainer>
    </AuthPage>
  );
};

export default Home;
