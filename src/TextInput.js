import React, {Component} from 'react';

class TextInput extends Component {
  render() {
    const {placeholder, label, onInputFocus, onInputBlur, inputValue, onInputChange, customeRef} = this.props;
    return (
      <div>
        <label>{label}</label>
        <input ref={customeRef} type="text" placeholder={placeholder} onFocus={onInputFocus} onBlur={onInputBlur} />
      </div>
    );
  }
}

export default TextInput;
