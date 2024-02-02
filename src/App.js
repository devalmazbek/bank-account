import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        balance: state.balance + 500,
        isActive: false,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance > 0 ? state.balance - 50 : state.balance,
      };
    case "loan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payloan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    case "close": {
      if (state.balance === 0 && state.loan === 0) {
        return {
          ...initialState,
        };
      }
      return {
        ...state,
      };
    }
    default:
      throw new Error("Unkown");
  }
}

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <div className="btn">
        <p>
          <button
            disabled={!isActive}
            onClick={() => dispatch({ type: "open" })}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            disabled={isActive}
            onClick={() => dispatch({ type: "deposit" })}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            disabled={isActive}
            onClick={() => dispatch({ type: "withdraw" })}
          >
            Widthdraw 50
          </button>
        </p>
        <p>
          <button
            disabled={isActive}
            onClick={() => dispatch({ type: "loan", payload: 5000 })}
          >
            Request a loan of 5000
          </button>
        </p>
        <p>
          <button
            disabled={isActive}
            onClick={() => dispatch({ type: "payloan" })}
          >
            pay loan
          </button>
        </p>
        <p>
          <button
            disabled={isActive}
            onClick={() => dispatch({ type: "close" })}
          >
            close account
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
