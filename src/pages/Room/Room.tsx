import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputTextarea from "../../components/InputTextarea";
import Question from "../../components/Question";
import QuestionsCounter from "../../components/QuestionsCounter";
import RoomTitle from "../../components/RoomTitle";
import UserInfo from "../../components/UserInfo";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import {
  Container,
  Content,
  RoomTitleContainer,
  FormFooter,
} from "./Room.styled";

type RoomParams = {
  id: string;
};

const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = React.useState("");
  const { questions, title } = useRoom(roomId);

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (newQuestion.trim() === "") return;
    if (!user) throw Error("You must be logged in");
    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
  };

  return (
    <Container>
      <Header admin={false} />
      <Content>
        <RoomTitleContainer>
          <RoomTitle title={title} />
          {questions.length > 0 && (
            <QuestionsCounter questions={questions.length} />
          )}
        </RoomTitleContainer>
        <form onSubmit={handleSendQuestion}>
          <InputTextarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <FormFooter>
            {user ? (
              <UserInfo avatar={user.avatar} username={user.name} />
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}
            <Button type="submit" style={{ width: "initial" }} disabled={!user}>
              Enviar pergunta
            </Button>
          </FormFooter>
        </form>
        {questions.map((question) => (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
            admin={false}
            questionId={question.id}
            roomId={roomId}
            user={user}
            likeCount={question.likeCount}
            likeId={question.likeId}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Room;
