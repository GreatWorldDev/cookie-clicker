import Head from "next/head";
import { useEffect, useRef, useReducer, useState } from "react";
import {
  reducer,
  initialState,
  initialUpgradeState,
  upgradeReducer,
} from "../utils/reducer";
import Clicker from "../components/Clicker";
import Autoclicker from "../components/AutoClicker";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [upgradeState, upgradeDispatch] = useReducer(
    upgradeReducer,
    initialUpgradeState
  );
  const [showButton, setShowButton] = useState(false);
  const [boostActive, setBoostActive] = useState(false);
  const timeoutId = useRef();
  const callback = useRef();

  const randomPosition = () => ({
    position: "absolute",
    botom: `${Math.random() * 80}%`,
    left: `${Math.random() * 90}%`,
  });

  const showGoldenButton = () => {
    setShowButton(true);
    setButtonStyle(randomPosition());
    timeoutId.current = setTimeout(() => setShowButton(false), 3000);
    const randomTime = Math.floor(Math.random() * 60 + 1) * 1000;
    setTimeout(showGoldenButton, randomTime);
  };

  const handleClick = () => {
    clearTimeout(timeoutId.current);
    setShowButton(false);
    setBoostActive(true);
    timeoutId.current = setTimeout(() => setBoostActive(false), 30000);
  };

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 60 + 1) * 1000;
    const timerId = setTimeout(showGoldenButton, randomTime);
    return () => {
      clearTimeout(timerId);
      clearTimeout(timeoutId.current);
    };
  }, []);

  const [buttonStyle, setButtonStyle] = useState(randomPosition);

  useEffect(() => {
    callback.current = () => {
      const currentClics = state.clicks.amount;
      const autoclicks = upgradeState.clickUpgrade.multiplier;
      const clickMultiplier = upgradeState.autoUpgrade.multiplier;
      const multiplier = boostActive ? 1.2 : 1;
      const totalCount =
        Object.keys(state).reduce(
          (acc, cur, idx) =>
            idx === 0 ? acc : acc + state[cur].amount * (state[cur].cost * 0.1),
          currentClics
        ) *
        multiplier *
        autoclicks *
        clickMultiplier;

      dispatch({ type: "update", payload: totalCount });
    };
  }, [state, boostActive]);

  useEffect(() => {
    const interval = setInterval(() => callback.current(), 1000);
    return () => clearInterval(interval);
  }, [callback]);

  return (
    <div className={styles.container}>
      <Head>
        <title>🍪 Cookie Clicker</title>
      </Head>

      <main>
        <div className={styles.clicker}>
          <h1>{Intl.NumberFormat().format(Math.floor(state.clicks.amount))}</h1>
          <Clicker amount={state.clicks.amount} dispatch={dispatch} />
        </div>
        <div className={styles.field}>
          <h2>Welcome to Cookie Clicker!!!</h2>
          <h2>🍪 Mark - Repath 🍪 Hope your good feedback!</h2>
          {Object.keys(state).map((tier, idx) => {
            if (idx === 0 || idx === 1) {
              return null;
            }
            const { bgImg, amount, image } = state[tier];
            return (
              amount > 0 && (
                <div
                  key={tier}
                  className={styles.fieldItems}
                  style={{ backgroundImage: `url(${bgImg})` }}
                >
                  {[...Array(amount)].map((_, index) => (
                    <img src={image} key={index} />
                  ))}
                </div>
              )
            );
          })}
          {showButton && (
            <button
              className={styles.goldenButton}
              style={buttonStyle}
              onClick={handleClick}
            >
              <img src="/images/golden.png" />
            </button>
          )}
        </div>
        <div className={styles.store}>
          {Object.keys(state).map((tier, idx) => {
            if (idx === 0) {
              return null;
            }
            const { cost, amount, image } = state[tier];
            return (
              <Autoclicker
                key={tier}
                tier={tier}
                amount={amount}
                cost={cost}
                image={image}
                active={state.clicks.amount >= cost}
                enabled={state.clicks.amount >= cost}
                dispatch={dispatch}
              />
            );
          })}
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
