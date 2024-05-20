import React from "react";
import { InpuBoxContainer, Input, Label } from "./styles";

type InputBoxType = {
  label: string;
};

const InputBox = React.forwardRef<HTMLInputElement, InputBoxType>(
  (props: InputBoxType, ref) => (
    <InpuBoxContainer>
      <Label>{props.label}</Label>
      <Input ref={ref} type="text" />
    </InpuBoxContainer>
  )
);
InputBox.displayName = "InputBox";
export default InputBox;
