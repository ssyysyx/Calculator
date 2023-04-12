import ACTIONS from "./action";

const evaluate = state => {
    let {currentOperand, lastOperand, operation} = state;
    let last = parseFloat(lastOperand);
    let current = parseFloat(currentOperand);

    let res = "";
    switch(operation) {
        case '+':
            res = last + current;
            break
        case '-':
            res = last - current;
            break
        case '×':
            res = last * current;
            break
        case '÷':
            res = last / current;
            break
    }
    return res.toString();
}

const reducer = (state={
    currentOperand: "",
    lastOperand: "",
    operation: "",
    overwrite: false,
}, action) => {
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            //如果要覆盖掉的话
            if (state.overwrite) 
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false,
                }
            if (state.currentOperand === '0' && action.digit ==='0')
                return state;
            if (state.currentOperand === '0' && action.digit !== '.')
                return {
                    ...state,
                    currentOperand: action.digit,
                }
            if (action.digit ==='.' && state.currentOperand.includes('.'))
                return state;
            if (action.digit ==='.' && state.currentOperand === '')
                return {
                    ...state,
                    currentOperand: '0.',
                }
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) 
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false,
                }
            if (state.currentOperand === "") return state;
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0,-1),
            }
        case ACTIONS.CHOOSE_OPERATION:
            if (state.lastOperand === ""  && state.currentOperand === "")
                return state;
            if (state.lastOperand === "") 
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: "",
                }
            if (state.currentOperand === "")
                return {
                    ...state,
                    operation: action.operation,
                }
            // js里的switch和C++是一样的，当发现某个case成立的时候，后面就不再判断了，如果不break火return的话，也会顺序执行到最后。
            return {
                ...state,
                lastOperand: evaluate(state),
                operation: action.operation,
                currentOperand: "",
            }
        case ACTIONS.CLEAR:
            return {
                ...state,
                currentOperand: "",
                lastOperand: "",
                operation: "",
            }
        case ACTIONS.EVALUATE:
            if (state.currentOperand === "" ||
                state.lastOperand === "" ||
                state.operation === "")
                return state;
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: "",
                operation: "",
                // 当我们按完等号，overwrite应该是true
                overwrite: true,
            }
        default: return state;
    }
};

export default reducer;

