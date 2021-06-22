import React from "react";
import { useHistory } from "react-router-dom";
import illustration from "../../assets/images/illustration.svg";
import login from "../../assets/images/login.svg";
import {
  Aside,
  AuthFormContainer,
  AuthPage,
  Separator,
  Subtitle,
  Title,
} from "./Home.styled";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import GoogleButton from "../../components/GoogleButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const history = useHistory();

  const {user, signInWithGoogle} = useAuth();

  const handleCreateRoom = async () => {
    if(!user){
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  };

  return (
    <AuthPage>
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
      <AuthFormContainer>
        <div>
          <Logo width={150} />
          <GoogleButton onClick={handleCreateRoom}>
            Crie sua sala com o Google
          </GoogleButton>
          <Separator> ou entre em uma sala</Separator>
          <form>
            <Input type="text" placeholder="Digite o código da sala" />
          </form>
          <Button type="submit" style={{ marginTop: "16px" }}>
            <img src={login} alt="" />
            Entrar na sala
          </Button>
        </div>
      </AuthFormContainer>
    </AuthPage>
  );
};

export default Home;