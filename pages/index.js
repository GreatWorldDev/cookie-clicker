import Head from "next/head";
import { useEffect, useRef, useReducer } from "react";
import { reducer, initialState } from "../utils/reducer";
import Clicker from "../components/Clicker";
import Autoclicker from "../components/AutoClicker";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const callback = useRef();

  useEffect(() => {
    callback.current = () => {
      const currentClics = state.clicks.amount;
      const totalCount = Object.keys(state).reduce(
        (acc, cur, idx) =>
          idx === 0 ? acc : acc + state[cur].amount * (state[cur].cost * 0.1),
        currentClics
      );

      dispatch({ type: "update", payload: totalCount });
    };
  }, [state]);

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
          <h1>{Intl.NumberFormat().format(state.clicks.amount)}</h1>
          <Clicker amount={state.clicks.amount} dispatch={dispatch} />
        </div>
        <div className={styles.field}>
          <h2>Welcome to Cookie Clicker!!!</h2>
          {Object.keys(state).map((tier, idx) => {
            if (idx === 0) {
              return null;
            }
            const { cost, amount, image } = state[tier];
            return (
              amount > 0 && (
                <div key={tier} className={styles.fieldItems}>
                  {[...Array(amount)].map((_, index) => (
                    <img src={image} key={index} />
                  ))}
                </div>
              )
            );
          })}
          {isLucky && <button>Lucky Bread</button>}
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
