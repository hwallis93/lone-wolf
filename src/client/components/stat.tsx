import "./stat.css";

interface Props {
  title: string;
  value: number;
  controls: boolean;
  max?: number;
  incrementCallback: (increment: number) => void;
}
const Stat: React.FC<Props> = ({
  title,
  value,
  controls,
  max,
  incrementCallback,
}) => {
  const maxString = max !== undefined ? `(max. ${max})` : "";
  return (
    <div className="Stat">
      <h3 className="Stat__title">{`${title} ${maxString}`}</h3>
      {controls ? (
        <button
          className="Stat__decreaseButton primary"
          onClick={() => incrementCallback(-1)}
        >
          -
        </button>
      ) : (
        <button
          className="Stat__decreaseButton primary"
          disabled
        >
          -
        </button>
      )}
      <p className="Stat__value">{value}</p>
      {controls ? (
        <button
          className="Stat__increaseButton primary"
          onClick={() => incrementCallback(1)}
        >
          +
        </button>
      ) : (
        <button
          className="Stat__increaseButton primary"
          disabled
        >
          +
        </button>
      )}
    </div>
  );
};
export default Stat;
