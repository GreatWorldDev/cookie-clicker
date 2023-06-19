const initialState = {
  clicks: { amount: 0 },
  grandma: { cost: 10, amount: 0 },
  farm: { cost: 20, amount: 0 },
  mine: { cost: 100, amount: 0 },
  factory: { cost: 1000, amount: 0 },
  bank: { cost: 10000, amount: 0 },
  temple: { cost: 100000, amount: 0 },
  upgrades: {
    manualClick: { cost: 50, multiplier: 2, level: 0 },
    grandmaEfficiency: { cost: 500, multiplier: 2, level: 0 },
    // Add more upgrades here
  },
  boosts: {
    goldenCookie: { duration: 0, multiplier: 2 },
  },
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

    case "purchaseUpgrade":
      if (state.upgrades[action.upgrade].cost <= state.clicks.amount) {
        return {
          ...state,
          upgrades: {
            ...state.upgrades,
            [action.upgrade]: {
              ...state.upgrades[action.upgrade],
              level: state.upgrades[action.upgrade].level + 1,
            },
          },
          clicks: {
            amount: state.clicks.amount - state.upgrades[action.upgrade].cost,
          },
        };
      }
      return state;
    case "activateBoost":
      if (state.boosts[action.boost].cost <= state.clicks.amount) {
        return {
          ...state,
          boosts: {
            ...state.boosts,
            [action.boost]: {
              ...state.boosts[action.boost],
              duration: state.boosts[action.boost].initialDuration,
            },
          },
          clicks: {
            amount: state.clicks.amount - state.boosts[action.boost].cost,
          },
        };
      }
      return state;
    case "tickBoosts":
      let newBoosts = { ...state.boosts };
      for (let boost in newBoosts) {
        if (newBoosts[boost].duration > 0) {
          newBoosts[boost].duration -= 1;
        }
      }
      return { ...state, boosts: newBoosts };
    default:
      throw new Error();
  }
};

export { reducer, initialState };
