import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import Logo from "./Logo";
import RoomCode from "./RoomCode";
import SwitchButton from "./SwitchButton";

type RoomParams = {
  id: string;
}

const Header = () => {
  const { toggleTheme } = React.useContext(ThemeContext);
  const params = useParams<RoomParams>();

  return (
    <Container>
      <Content>
        <Logo width={"100"} />
        <Wrapper>
          <RoomCode code={params.id} />
          <SwitchButton toggleTheme={toggleTheme} />
        </Wrapper>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  padding: 24px 0 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;
