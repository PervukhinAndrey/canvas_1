"use client";
import { useRef, useEffect } from "react";
import { CanvasContainer } from "./styles";
import {
  drawExtensionLines,
  ExtensionLinesDirection as Direction,
} from "../../functions/drawExtensionLines";
import { drawPoligon, PoligonSize } from "../../functions/drawPoligon";
import { drawArea } from "../../functions/drawArea";

type CanvasElementType = {
  size: PoligonSize;
};

export default function CanvasElement(props: CanvasElementType) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 900;
      canvas.height = 900;
      const ctx = canvas.getContext("2d");
      const size = props.size;

      if (ctx) {
        const { coords, newLineWidth } = drawPoligon(ctx, size);

        drawExtensionLines(
          ctx,
          [coords[5], coords[6]],
          Direction.Right,
          newLineWidth,
          size.height - size.ledgeHeight,
          size.lineWidth
          //true
        );
        drawExtensionLines(
          ctx,
          [coords[5], coords[6]],
          Direction.Left,
          newLineWidth,
          size.height - size.ledgeHeight,
          size.lineWidth,
          true
        );
        drawExtensionLines(
          ctx,
          [coords[6], coords[7]],
          Direction.Up,
          newLineWidth,
          size.width,
          size.lineWidth,
          true
        );
        drawExtensionLines(
          ctx,
          [coords[6], coords[7]],
          Direction.Down,
          newLineWidth,
          size.width,
          size.lineWidth
          //true
        );
        drawArea(ctx, size);
      }
    }
  });
  return (
    <CanvasContainer>
      <canvas ref={canvasRef} />
    </CanvasContainer>
  );
}
