import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputTextarea from "../../components/InputTextarea";
import QuestionsCounter from "../../components/QuestionsCounter";
import RoomTitle from "../../components/RoomTitle";
import UserInfo from "../../components/UserInfo";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import {
  Container,
  Content,
  RoomTitleContainer,
  FormFooter,
} from "./Room.styled";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: string;
  }
>;

type RoomParams = {
  id: string;
};

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: string;
};

const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = React.useState("");
  const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        },
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestion);
    });
  }, [roomId]);

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
      <Header />
      <Content>
        <RoomTitleContainer>
          <RoomTitle title={title} />
          {questions.length > 0 && (<QuestionsCounter questions={questions.length} />)}
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
      </Content>
    </Container>
  );
};

export default Room;
