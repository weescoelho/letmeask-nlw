/**
 * Custom hook para abstração das funcionalidades de carregamento das perguntas
 * 
 */

import React from 'react'
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type QuestionsType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, { authorId: string }>
  }
>;

export const useRoom = (roomId: string) => {
  const { user } = useAuth()
  const [questions, setQuestions] = React.useState<QuestionsType[]>([]);
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
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          };
        },
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestion);
    });
    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id]);

  return {
    questions, title
  }

}