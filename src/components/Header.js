import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
  font-family: "Press Start 2P", sans-serif;
  color: #f7c406;
  text-shadow: 4px 4px #326bac;
  font-size: 2em;
  background-color: #f1f1f1;
  margin: unset;
  padding: 1em;
  text-align: center;

  h2 {
    margin: unset;
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <h2>PokeDex</h2>
    </HeaderStyle>
  );
};

export default Header;
