import styled from "styled-components/native";
import { turncateStyles } from "./utils.styled";

const textAlign = ({ left, right }) =>
  left ? "left" : right ? "right" : "center";

const colorSwitch = ({ light, white }) =>
  light ? "#bdbdbd" : white ? "#fff" : "#000";

const marginTop = ({ small, medium }) => (small ? 25 : medium ? 50 : 5);
const marginBottom = ({ small, medium }) => (small ? 25 : medium ? 50 : 5);

// headings
export const StyledHeadingMaxBig = styled.Text`
  color: black;
  font-size: 60px;
  font-weight: 400;
  // line-height: 52px;
  letter-spacing: -0.144px;
  margin: 36px 0;
  // text-align: ${textAlign};
`;
export const StyledHeadingBig = styled.Text`
  //   color: ${({ theme, gradient }) => (gradient ? null : theme.color)};
  color: black;
  font-size: 44px;
  font-weight: 600;
  line-height: 52px;
  letter-spacing: -0.144px;
  margin: 20px 0;
  // text-align: ${textAlign};
`;

export const StyledHeading = styled.Text`
  color: #000;
  ${({ theme }) =>
    theme.typography["display-h1"]}; /* // text-align: ${textAlign}; */
`;
export const StyledSemiHeading = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography["display-h2"]}// text-align: ${textAlign};
`;

// check here update like above.
export const StyledMediumHeading = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 23.4px;
  margin-top: ${marginTop}px;
  margin-bottom: ${marginBottom}px;
  // text-align: ${textAlign};

  ${({ turncate }) => (turncate ? turncateStyles : ``)}
`;

// Paragraphs
export const StyledParagraph = styled.Text`
  color: ${colorSwitch};
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  margin-top: 0;
  margin-bottom: 0;
  // text-align: ${textAlign};
`;

export const StyledParagraphBold = styled.Text`
  color: ${({ theme }) => theme.color};
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  // text-align: ${textAlign};
`;

export const StyledParagraphGray = styled.Text`
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  line-height: 22.4px;
  font-size: 17px;
  font-weight: 600;
  // text-align: ${textAlign};
`;

export const StyledParagraphSmallGray = styled.Text`
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  // text-align: ${textAlign};
`;

export const StyledParagraphSmall = styled.Text`
  color: ${({ theme }) => theme.colors["black"]};
  font-size: 12px;
  font-weight: 400;
  line-height: 18.2px;
  margin: 0;
  // text-align: ${textAlign};
`;

export const StyledParagraphSmallVisible = styled.Text`
  color: ${({ theme }) => theme.commonGrayVisible};
  font-size: 12px;
  font-weight: 400;
  line-height: 18.2px;
  margin: 10px 0;
  // text-align: ${textAlign};
`;

// Anchor tags (links)

// check here for a tags.
// export const StyledAnchor = styled.a`
//   color: ${({ theme }) => theme.colors} !important;
//   font: ${({ theme }) => theme.typography};

//   /* check this once  */

//   /* font-size: 12px;
//   font-weight: 600;
//   line-height: 18.2px; */
//   cursor: pointer;
//   text-decoration: none;
//   // text-align: ${textAlign};
//   /* check this its 2 text decoration is there */
//   text-decoration: underline;

//   &:hover {
//     text-decoration-color: ${({ theme }) => theme.commonAnchorColor};
//     text-decoration-style: solid;
//   }
// `;

// export const StyledGrayLink = styled.span`
//   color: ${({ theme }) => theme.commonGrayVisible} !important;
//   font-size: 12px;
//   font-weight: 600;
//   line-height: 18.2px;
//   cursor: pointer;
//   text-decoration: underline;
//   // text-align: ${textAlign};

//   &:hover {
//     color: rgb(255 255 255 / 85%) !important;
//     // text-decoration-color: ${({ theme }) => theme.commonAnchorColor};
//     // text-decoration-style: solid;
//   }
// `;

// export const StyledAnchorSmall = styled.a`
//   color: ${({ theme }) => theme.commonAnchorColor || "#22c55e"};
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 18.2px;
//   // text-align: ${textAlign};
//   cursor: pointer;

//   &:hover {
//     text-decoration-color: ${({ theme }) =>
//       theme.commonAnchorColor || "#22c55e"};
//     text-decoration: underline;
//     text-decoration-style: solid;
//   }
// `;

export const StyledParagraphError = styled.Text`
  color: #a30000;
  font-size: 12px;
  font-weight: 400;
  line-height: 18.2px;
  margin: 0;
  text-align: left;
`;
