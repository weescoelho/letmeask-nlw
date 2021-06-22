import React from "react";
import styled from "styled-components";
import logoImg from "../assets/images/logo.svg";
interface Props {
  width?: number;
}

const Image = styled.img<{ width?: number }>`
  max-width: ${(props) =>props.width};
  align-self:center;
`;

const Logo: React.FC<Props> = ({ width }) => {
  return (
    <Image
      src={logoImg}
      alt="logo"
      width={width}
    />
  );
};

export default Logo;
