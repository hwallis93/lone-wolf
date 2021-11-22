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
    <>
      <span>{`${title} ${maxString}`}</span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "30px",
        }}
      >
        {controls ? (
          <button
            onClick={() => incrementCallback(-1)}
            style={{ marginRight: "10px", alignSelf: "center" }}
          >
            -
          </button>
        ) : null}
        <span style={{ textAlign: "center", fontSize: "30px" }}>{value}</span>
        {controls ? (
          <button
            onClick={() => incrementCallback(1)}
            style={{ marginLeft: "10px", alignSelf: "center" }}
          >
            +
          </button>
        ) : null}
      </div>
    </>
  );
};
export default Stat;
