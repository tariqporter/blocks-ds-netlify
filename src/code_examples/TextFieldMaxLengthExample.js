import React from "react"

const { TextField } = require('blocks-react').Input;

class TextFieldMaxLengthExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <TextField
        placeholder="Text input"
        value={this.state.value}
        onChange={e => this.onChange(e)}
        maxLength="150"
      />
    );
  }
}

export default TextFieldMaxLengthExample;
