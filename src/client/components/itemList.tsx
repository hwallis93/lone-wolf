import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./itemList.css";

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
        placeholder="Add a new item"
      />
    </li>
  ) : null;

  return (
    <div className="ItemList">
      <h3 className="ItemList__title">{header}</h3>
      <ul role="list" className="ItemList__items">
        {items.length === 0 ? (
          <li><em>{"<Empty>"}</em></li>
        ) : null}
        {items.map((item) => (
          <li>
            {item}
            {controls ? (
              <button
                className="ItemList__removeButton primary"
                onClick={() => removeCallback(item)}
              >
                ✖
              </button>
            ) : null}
          </li>
        ))}
        {itemAdder}
      </ul>
    </div>
  );
};

export default ItemList;
