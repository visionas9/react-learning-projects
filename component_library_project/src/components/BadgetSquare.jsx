import React, { useContext } from "react";
import { ToggleContext } from "../App";

export default function BadgetSquare() {
  const { on, toggle } = useContext(ToggleContext);
  const badgeButtons = Array.from({ length: 8 }, (_, index) => (
    <button key={index}>Badge</button>
  ));
  console.log(on);
  return <div>{badgeButtons}</div>;
}
