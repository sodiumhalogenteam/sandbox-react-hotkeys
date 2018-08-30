import React, {Component} from 'react';
import {HotKeys} from 'react-hotkeys';

const keyMap = {
  exitInput: 'esc',
};

class TextInput extends Component {
  render() {
    const keyHandlers = {
      exitInput: () => {
        document.querySelector('#hotkeys').focus();
      },
    };

    const {placeholder, label, onInputFocus, onInputBlur, inputValue, onInputChange, customeRef} = this.props;
    return (
      <HotKeys keyMap={keyMap} handlers={keyHandlers}>
        <label>{label}</label>
        <input ref={customeRef} type="text" placeholder={placeholder} onFocus={onInputFocus} onBlur={onInputBlur} />
      </HotKeys>
    );
  }
}

export default TextInput;
