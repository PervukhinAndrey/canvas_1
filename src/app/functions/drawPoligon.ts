export type PoligonSize = {
  width: number;
  height: number;
  ledgeWidth: number;
  ledgeHeight: number;
  lineWidth: number;
};

// Пересчет размеров полигона в пиксели с сохранением пропорций.
// Максимальный размер берется равным maxSize
function calcProporion(size: PoligonSize, maxSize = 500) {
  const oldMaxSize = Math.max(size.width, size.height);
  const newSize: PoligonSize = {
    width: 0,
    height: 0,
    ledgeWidth: 0,
    ledgeHeight: 0,
    lineWidth: 0,
  };
  newSize.width = maxSize * (size.width / oldMaxSize);
  newSize.height = maxSize * (size.height / oldMaxSize);
  newSize.ledgeWidth = maxSize * (size.ledgeWidth / oldMaxSize);
  newSize.ledgeHeight = maxSize * (size.ledgeHeight / oldMaxSize);
  newSize.lineWidth = maxSize * (size.lineWidth / oldMaxSize);

  return newSize;
}

function calcPoligonCoords(size: PoligonSize, topLeftBoxCorner = [200, 100]) {
  const coords = [];
  coords[0] = [topLeftBoxCorner[0], topLeftBoxCorner[1] + size.ledgeHeight];
  coords[1] = [coords[0][0] + (size.width - size.ledgeWidth) / 2, coords[0][1]];
  coords[2] = [coords[1][0], coords[1][1] - size.ledgeHeight];
  coords[3] = [coords[2][0] + size.ledgeWidth, coords[2][1]];
  coords[4] = [coords[3][0], coords[3][1] + size.ledgeHeight];
  coords[5] = [coords[4][0] + (size.width - size.ledgeWidth) / 2, coords[4][1]];
  coords[6] = [coords[5][0], coords[5][1] + (size.height - size.ledgeHeight)];
  coords[7] = [coords[6][0] - size.width, coords[6][1]];
  return coords;
}

function drawPoligonByCoordinates(
  ctx: CanvasRenderingContext2D,
  coords: Array<Array<number>>,
  lineWidth: number
) {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";

  coords.forEach((el, i) => {
    if (i === 0) {
      ctx.moveTo(el[0], el[1]);
    } else {
      ctx.lineTo(el[0], el[1]);
    }
  });
  ctx.lineWidth = lineWidth;
  ctx.closePath();
  ctx.stroke();
}

export function drawPoligon(ctx: CanvasRenderingContext2D, size: PoligonSize) {
  const newSize = calcProporion(size);
  const coords = calcPoligonCoords(newSize);
  drawPoligonByCoordinates(ctx, coords, newSize.lineWidth);
  return { coords: coords, newLineWidth: newSize.lineWidth };
}
