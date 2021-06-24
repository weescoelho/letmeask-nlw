import styled from "styled-components";

type Props = {
  avatar: string;
  username: string;
};

const UserInfo = ({avatar, username}: Props) => {
  return (
    <Wrapper>
      <img src={avatar} alt={username} />
      <span>{username}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  span {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

export default UserInfo;
