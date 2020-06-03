import styled from "styled-components";

export const BodyArea = styled.div`
  grid-area: body;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

export const Container = styled.div`
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

export const FooterArea = styled.div`
  grid-area: footer;
`;

export const NavbarArea = styled.div`
  grid-area: navbar;
`;

export const SelectContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: left;
  margin-bottom: 15px;

  *:first-child {
    margin-right: 5px;
  }
`;

export const TitleArea = styled.div`
  grid-area: title;
`;

// export const DaiInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: left;
//   width: 100%;

//   > * {
//     display: flex;
//     width: 100%;
//     justify-content: space-between;
//   }
// `;
