import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Control } from "../types";

interface Props {
  title: string;
  controls: boolean;
  items: string[];
  maxLength?: number;
  addCallback: (item: string) => void;
  removeCallback: (item: string) => void;
}
const ItemList: React.FC<Props> = ({
  title,
  controls,
  items,
  maxLength,
  addCallback,
  removeCallback,
}) => {
  const [input, setInput] = useState("");

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addCallback(input);
      setInput("");
    }
  };

  const showAddItem =
    controls && (maxLength === undefined || items.length < maxLength);
  const maxInfo = maxLength ? ` (max. ${maxLength})` : "";

  const header = title + maxInfo;
  const itemAdder = showAddItem ? (
    <li>
      <input
        value={input}
        onChange={change}
        onKeyPress={handleKeyPress}
      ></input>
    </li>
  ) : null;

  if (items.length === 0) {
    return (
      <>
        {header}
        <em style={{ padding: "5px 0px 10px 10px" }}>{"<Empty>"}</em>
        {itemAdder}
      </>
    );
  }

  return (
    <>
      {header}
      <ul>
        {items.map((item) => (
          <li>
            {item}
            {controls ? (
              <button
                style={{ color: "red", marginLeft: "10px" }}
                onClick={() => removeCallback(item)}
              >
                X
              </button>
            ) : null}
          </li>
        ))}
        {itemAdder}
      </ul>
    </>
  );
};

export default ItemList;
