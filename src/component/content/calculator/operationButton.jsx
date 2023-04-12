import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/action';

class OperationButton extends Component {
    state = {  } 
    render() { 
        return (
            <button
                onClick={() => {
                    this.props.choose_operation(this.props.operation);
                }}
            >{this.props.operation}
            </button>
        );
    }
}

const mapDispatchToProps = {
    choose_operation: operation => {
        return {
            //将字符串定义成常量是为了方便未来的修改
            type: ACTIONS.CHOOSE_OPERATION,
            operation: operation,
        }
    }
}

export default connect(null, mapDispatchToProps)(OperationButton);

