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

  return (
    <>
      {`${title}` + maxInfo}
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
        {showAddItem ? (
          <li>
            <input
              value={input}
              onChange={change}
              onKeyPress={handleKeyPress}
            ></input>
          </li>
        ) : null}
      </ul>
    </>
  );
};

export default ItemList;
