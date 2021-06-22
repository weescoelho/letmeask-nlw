import React from "react";
import { Link } from "react-router-dom";
import illustration from "../../assets/images/illustration.svg";
import {
  Aside,
  AuthFormContainer,
  AuthPage,
  SectionTitle,
  Subtitle,
  Title,
} from "./NewRoom.styled";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

const NewRoom = () => {
  const { user } = useAuth();

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
          <SectionTitle>Crie uma nova sala</SectionTitle>
          <form>
            <Input type="text" placeholder="Nome da sala" />
          </form>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Criar sala
          </Button>
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