import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import useMedia from "../hooks/useMedia";
import { database } from "../services/firebase";
import Button from "./Button";
import Logo from "./Logo";
import RoomCode from "./RoomCode";
import SwitchButton from "./SwitchButton";
import ModalDeleteRoom from "../components/ModalDeleteRoom";

type RoomParams = {
  id: string;
};

type HeaderProps = {
  admin: boolean;
  roomId?: string;
};

const Header = ({ admin, roomId }: HeaderProps) => {
  const { toggleTheme } = React.useContext(ThemeContext);
  const params = useParams<RoomParams>();
  const mobile = useMedia("(max-width:739px)");
  const [openModal, setOpenModal] = React.useState(false);
  
  // const handleEndRoom = async () => {
  //   await database.ref(`rooms/${roomId}`).update({
  //     endedAt: new Date(),
  //   });
  //   addToast("A sala foi encerrada com sucesso!", {
  //     appearance: "success",
  //     autoDismiss: true,
  //   });
  //   history.push("/");
  // };

  return (
    <Container>
      <ModalDeleteRoom
        setOpenModal={setOpenModal}
        open={openModal}
        roomId={roomId}
      />
      <Content>
        <LogoWrapper>
          <Logo width={"100"} />
          {mobile && <SwitchButton toggleTheme={toggleTheme} />}
        </LogoWrapper>
        <Wrapper>
          <RoomCode code={params.id} />
          {admin && (
            <Button
              outline
              style={{ width: "160px", height: "40px" }}
              onClick={() => setOpenModal(true)}
            >
              Encerrar sala
            </Button>
          )}
          {!mobile && <SwitchButton toggleTheme={toggleTheme} />}
        </Wrapper>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  padding: 24px 0 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  @media (max-width: 739px) {
    padding: 24px 0 24px 0;
  }
`;

const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 739px) {
    max-width: 290px;
    flex-direction: column;
  }
  @media (min-width: 739px) and (max-width: 989px) {
    max-width: 640px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default React.memo(Header);
