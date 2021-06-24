import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Question from "../../components/Question";
import QuestionsCounter from "../../components/QuestionsCounter";
import RoomTitle from "../../components/RoomTitle";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import {
  Container,
  Content,
  RoomTitleContainer,
} from "./AdminRoom.styled";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);


  return (
    <Container>
      <Header admin={true} roomId={roomId}/>
      <Content>
        <RoomTitleContainer>
          <RoomTitle title={title} />
          {questions.length > 0 && (
            <QuestionsCounter questions={questions.length} />
          )}
        </RoomTitleContainer>
        {questions.map((question) => (
          <Question
          key={question.id}
          content={question.content}
          author={question.author}
          admin={true}
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

export default AdminRoom;
