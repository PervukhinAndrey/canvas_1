// Матрицы для рассчета того, надо ли прибавлять или отнимать половину
// ширины линии к координате.
// Строка матрицы выбирается в зависимости от ExtensionLinesDirection
// столбцы 0 и 1 относятся к координатам первой точки, а 2 и 3 - второй
// послдние два столбца показывают в каком направлении рисовать выносные линии
// directionOuterParams - матрица для внешних линий
// directionInnerParams - матрица для внутренних линий
const directionOuterParams = [
  //x1,y1,x2,y2,directionX,directionY
  [-1, -1, 1, -1, 0, -1],
  [-1, 1, 1, 1, 0, 1],
  [-1, -1, -1, 1, -1, 0],
  [1, -1, 1, 1, 1, 0],
];
const directionInnerParams = [
  //x1,y1,x2,y2,directionX,directionY
  [1, -1, -1, -1, 0, -1],
  [1, 1, -1, 1, 0, 1],
  [-1, 1, -1, -1, -1, 0],
  [1, 1, 1, -1, 1, 0],
];

export enum ExtensionLinesDirection {
  Up,
  Down,
  Left,
  Right,
}

const sortCoords = (
  a: Array<number>,
  b: Array<number>,
  d: ExtensionLinesDirection
) => {
  // Сортирует входящий массив из двух точек, так, чтоб первой шла та,
  // которая ближе к началу координат.
  // Выбор по какой из координат сортировать осуществляется в зависимости
  // от ExtensionLinesDirection
  if (d === 0 || d === 1) {
    return a[0] - b[0];
  }
  return a[1] - b[1];
};

export function drawExtensionLines(
  ctx: CanvasRenderingContext2D,
  coords: Array<Array<number>>,
  direction: ExtensionLinesDirection,
  newLineWidth: number,
  demonstratedValue: number,
  lineWidth: number,
  isInnerLines: boolean = false
) {
  const directionParams = isInnerLines
    ? directionInnerParams
    : directionOuterParams;
  coords.sort((a, b) => sortCoords(a, b, direction));
  ctx.lineWidth = 1;
  ctx.strokeStyle = "red";

  const textValue = isInnerLines
    ? demonstratedValue - lineWidth + " mm"
    : demonstratedValue + lineWidth + " mm";

  ctx.beginPath();
  ctx.moveTo(
    coords[0][0] + directionParams[direction][0] * (newLineWidth / 2),
    coords[0][1] + directionParams[direction][1] * (newLineWidth / 2)
  );
  ctx.lineTo(
    coords[0][0] +
      directionParams[direction][0] * (newLineWidth / 2) +
      directionParams[direction][4] * 70,
    coords[0][1] +
      directionParams[direction][1] * (newLineWidth / 2) +
      directionParams[direction][5] * 70
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    coords[1][0] + directionParams[direction][2] * (newLineWidth / 2),
    coords[1][1] + directionParams[direction][3] * (newLineWidth / 2)
  );
  ctx.lineTo(
    coords[1][0] +
      directionParams[direction][2] * (newLineWidth / 2) +
      directionParams[direction][4] * 70,
    coords[1][1] +
      directionParams[direction][3] * (newLineWidth / 2) +
      directionParams[direction][5] * 70
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    coords[0][0] +
      directionParams[direction][0] * (newLineWidth / 2) +
      directionParams[direction][4] * 60,
    coords[0][1] +
      directionParams[direction][1] * (newLineWidth / 2) +
      directionParams[direction][5] * 60
  );
  ctx.lineTo(
    coords[1][0] +
      directionParams[direction][2] * (newLineWidth / 2) +
      directionParams[direction][4] * 60,
    coords[1][1] +
      directionParams[direction][3] * (newLineWidth / 2) +
      directionParams[direction][5] * 60
  );
  ctx.stroke();

  ctx.font = "12px serif";

  const textParam1 = direction === 2 ? 35 : -10;
  const textParam2 = direction === 1 ? 50 : 70;
  const d =
    (coords[1][0] - coords[0][0]) / 2 === 0
      ? 0
      : (coords[1][0] - coords[0][0]) / 2 + textParam1;
  const e =
    (coords[1][1] - coords[0][1]) / 2 === 0
      ? 0
      : (coords[1][1] - coords[0][1]) / 2 + textParam1;
  const a =
    coords[0][0] +
    d +
    directionParams[direction][4] * (textParam2 + newLineWidth / 2);
  const b =
    coords[0][1] +
    e +
    directionParams[direction][5] * (textParam2 + newLineWidth / 2);

  if (direction === 2) {
    ctx.translate(a, b);
    ctx.rotate(-Math.PI / 2);
    ctx.translate(-a, -b);
  }

  if (direction === 3) {
    ctx.translate(a, b);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-a, -b);
  }
  ctx.fillText(textValue, a, b);
  if (direction === 2) {
    ctx.translate(a, b);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-a, -b);
  }
  if (direction === 3) {
    ctx.translate(a, b);
    ctx.rotate(-Math.PI / 2);
    ctx.translate(-a, -b);
  }
  return coords;
}
