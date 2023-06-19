import { memo } from "react";
import styles from "./AutoClicker.module.css";

const Autoclicker = memo(
  ({ tier, amount, cost, dispatch, enabled, active, image }) => {
    const buy = () => dispatch({ type: "increase", tier });
    const sell = () => dispatch({ type: "decrease", tier });

    return (
      <div
        className={`${styles.autoclicker} ${!active && styles.notactive}`}
        onClick={active ? buy : () => {}}
      >
        <div className={styles.right}>
          <img src={image} />
          <div className="info">
            <h1>{tier}</h1>
            <h2>🍪{Intl.NumberFormat().format(cost)}</h2>
          </div>
        </div>
        <div>
          <h2>{Intl.NumberFormat().format(amount)}</h2>
        </div>
        {amount > 0 && (
          <button className={styles.sell} type="button" onClick={sell}>
            Sell
          </button>
        )}
      </div>
    );
  }
);

export default Autoclicker;
