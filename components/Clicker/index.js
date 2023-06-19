import styles from "../../styles/Home.module.css";

const Clicker = ({ dispatch }) => (
  <button
    className={styles.wiggle}
    type="button"
    onClick={() => dispatch({ type: "click" })}
  >
    <img src="/images/bread.png" alt="bread" />
  </button>
);

export default Clicker;
