const Clicker = ({ amount, dispatch }) => (
  <div className="clicker">
    <h1>{Intl.NumberFormat().format(amount)}</h1>
    <button
      className="buy"
      type="button"
      onClick={() => dispatch({ type: "click" })}
    >
      <img src="/images/bread.png" alt="bread" />
    </button>
  </div>
);

export default Clicker;
