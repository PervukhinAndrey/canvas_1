"use client";
import { HomeContainer, FormConainer, Button } from "./styles";
import CanvasElement from "./components/canvasComponent/canvasComponent";
import { useRef, useState } from "react";
import InputBox from "./components/inputBox/inputBox";
import { PoligonSize } from "./functions/drawPoligon";

export default function Home() {
  const [isPoligonShowed, setIsPoligonShowed] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    ledgeWidth: 0,
    ledgeHeight: 0,
    lineWidth: 0,
  });
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const ledgeWidthRef = useRef<HTMLInputElement>(null);
  const ledgeHeightRef = useRef<HTMLInputElement>(null);
  const lineWidthRef = useRef<HTMLInputElement>(null);
  function handleButton() {
    setIsPoligonShowed(false);
    const newSize: PoligonSize = {
      width: 0,
      height: 0,
      ledgeWidth: 0,
      ledgeHeight: 0,
      lineWidth: 0,
    };
    if (widthRef.current && widthRef.current.value) {
      newSize.width = Number(widthRef.current.value);
    } else return;
    if (heightRef.current && heightRef.current.value) {
      newSize.height = Number(heightRef.current.value);
    } else return;
    if (ledgeWidthRef.current && ledgeWidthRef.current.value) {
      newSize.ledgeWidth = Number(ledgeWidthRef.current.value);
    } else return;
    if (ledgeHeightRef.current && ledgeHeightRef.current.value) {
      newSize.ledgeHeight = Number(ledgeHeightRef.current.value);
    } else return;
    if (lineWidthRef.current && lineWidthRef.current.value) {
      newSize.lineWidth = Number(lineWidthRef.current.value);
    } else return;
    setSize(newSize);
    setIsPoligonShowed(true);
  }
  return (
    <HomeContainer>
      <FormConainer>
        <InputBox label={"Общая ширина"} ref={widthRef} />
        <InputBox label={"Общая высота"} ref={heightRef} />
        <InputBox label={"Ширина выступа"} ref={ledgeWidthRef} />
        <InputBox label={"Высота выступа"} ref={ledgeHeightRef} />
        <InputBox label={"Толщина линии"} ref={lineWidthRef} />
        <Button onClick={handleButton}>Начертить</Button>
      </FormConainer>
      {isPoligonShowed && <CanvasElement size={size} />}
    </HomeContainer>
  );
}
