const initialState = {
  clicks: { amount: 0 },
  cursor: {
    cost: 10,
    amount: 0,
    image: "/images/cursor.png",
    bgImg: "/images/",
  },
  grandma: {
    cost: 20,
    amount: 0,
    image: "/images/grandma.png",
    bgImg: "/images/grandmabg.jpg",
  },
  farm: {
    cost: 100,
    amount: 0,
    image: "/images/farm.png",
    bgImg: "/images/farmbg.jpg",
  },
  mine: {
    cost: 1000,
    amount: 0,
    image: "/images/mine.png",
    bgImg: "/images/minebg.jpg",
  },
  factory: {
    cost: 10000,
    amount: 0,
    image: "/images/factory.png",
    bgImg: "/images/factorybg.jpg",
  },
  bank: {
    cost: 100000,
    amount: 0,
    image: "/images/bank.png",
    bgImg: "/images/bankbg.jpg",
  },
  temple: {
    cost: 1000000,
    amount: 0,
    image: "/images/temple.png",
    bgImg: "/images/templebg.jpg",
  },
};

const initialUpgradeState = {
  clickUpgrade: { level: 0, cost: 10, multiplier: 1 },
  autoUpgrade: { level: 0, cost: 20, multiplier: 1 },
};

const upgradeReducer = (state, action) => {
  switch (action.type) {
    case "buy_upgrade":
      const upgrade = state[action.payload];
      return {
        ...state,
        [action.payload]: {
          ...upgrade,
          level: upgrade.level + 1,
          cost: Math.floor(upgrade.cost * 1.5),
          multiplier: upgrade.multiplier * 1.2,
        },
      };

    case "increment_clicks":
      return {
        ...state,
        clicks: {
          amount: state.clicks.amount + action.payload * state.multiplier.click,
        },
      };
    case "increment_autoclicker":
      return {
        ...state,
        autoclicker: {
          amount: state.autoclicker.amount + state.multiplier.autoclick,
        },
      };
    case "update_multiplier":
      return {
        ...state,
        multiplier: {
          ...state.multiplier,
          [action.payload]: state.multiplier[action.payload] * 1.2,
        },
      };
    default:
      return state;
  }
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

export { reducer, initialState, initialUpgradeState, upgradeReducer };
