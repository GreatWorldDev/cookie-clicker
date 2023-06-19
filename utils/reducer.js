const initialState = {
  clicks: { amount: 0 },
  cursor: { cost: 10, amount: 0, image: "/images/cursor.png" },
  grandma: { cost: 20, amount: 0, image: "/images/grandma.png" },
  farm: { cost: 100, amount: 0, image: "/images/farm.png" },
  mine: { cost: 1000, amount: 0, image: "/images/bank.png" },
  factory: { cost: 10000, amount: 0, image: "/images/farm.png" },
  bank: { cost: 100000, amount: 0, image: "/images/bank.png" },
  temple: { cost: 1000000, amount: 0, image: "/images/bank.png" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "click":
      return {
        ...state,
        clicks: { ...state.clicks, amount: state.clicks.amount + 1 },
      };
    case "increase":
      if (state[action.tier].cost <= state.clicks.amount) {
        return {
          ...state,
          [action.tier]: {
            ...state[action.tier],
            amount: state[action.tier].amount + 1,
          },
          clicks: { amount: state.clicks.amount - state[action.tier].cost },
        };
      }
      return state;
    case "decrease":
      if (state[action.tier].amount > 0) {
        return {
          ...state,
          [action.tier]: {
            ...state[action.tier],
            amount: state[action.tier].amount - 1,
          },
          clicks: { amount: state.clicks.amount + state[action.tier].cost },
        };
      }
      return state;
    case "update":
      return action.payload === state.clicks.amount
        ? state
        : { ...state, clicks: { ...state.clicks, amount: action.payload } };
    default:
      throw new Error();
  }
};

export { reducer, initialState };
