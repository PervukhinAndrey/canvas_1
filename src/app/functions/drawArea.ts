import { PoligonSize } from "./drawPoligon";

function calcOuterArea(size: PoligonSize) {
  const area =
    (size.width + size.lineWidth) *
      (size.height - size.ledgeHeight + size.lineWidth) +
    (size.ledgeWidth + size.lineWidth) * size.ledgeHeight;
  return area;
}
function calcInnerArea(size: PoligonSize) {
  const area =
    (size.width - size.lineWidth) *
      (size.height - size.ledgeHeight - size.lineWidth) +
    (size.ledgeWidth - size.lineWidth) * size.ledgeHeight;
  return area;
}
export function drawArea(ctx: CanvasRenderingContext2D, size: PoligonSize) {
  ctx.font = "32px serif";
  ctx.fillText("S max=" + calcOuterArea(size), 0, 50);
  ctx.fillText("S min=" + calcInnerArea(size), 0, 100);
}
