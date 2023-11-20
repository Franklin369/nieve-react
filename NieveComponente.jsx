import styled from "styled-components";
import { NieveEffect } from "../hooks/NieveEffect";
import { useRef } from "react";
export function NieveComponente() {
  const canvasRef = useRef(null);
  return (
    <Container >
      <canvas ref={canvasRef}></canvas>
      <NieveEffect canvasRef={canvasRef} />
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
