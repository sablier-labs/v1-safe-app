import styled from "styled-components";

const Container = styled.div`
  font-size: 1.5em;
  min-height: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 50px auto 60px;
  grid-gap: 10px;
  grid-template-areas:
    "title title"
    "navbar body"
    "footer footer";
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-rows: 50px auto 1fr;
    grid-template-areas:
      "title"
      "navbar"
      "body"
      "footer";
  }
`;

const TitleArea = styled.div`
  grid-area: title;
`;
const NavbarArea = styled.div`
  grid-area: navbar;
`;
const BodyArea = styled.div`
  grid-area: body;
`;
const FooterArea = styled.div`
  grid-area: footer;
`;

export { Container, TitleArea, NavbarArea, BodyArea, FooterArea };
