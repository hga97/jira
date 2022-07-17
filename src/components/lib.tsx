import styled from "@emotion/styled";

export const Row = styled.div<{
  grap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-left: ${(props) =>
      typeof props.grap === "number"
        ? props.grap + "rem"
        : props.grap
        ? "2rem"
        : undefined};
  }
`;
