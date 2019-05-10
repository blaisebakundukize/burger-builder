import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

// By using utility to clean up the code
const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

// The same code but without using utility (for future reference!!!!!!!!)
const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  };
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: { // For not loosing the order, but this is not flexible
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false
  });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionType.SET_INGREDIENTS: return setIngredients(state, action);
    case actionType.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    default: return state;
  }
};

export default reducer;
