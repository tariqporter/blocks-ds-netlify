import React from "react"

const { Dropdown } = require('blocks-react').Dropdowns;
const { AddIcon } = require('blocks-react').Icons;

class DropdownIconExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: null
    };
  }

  render() {
    return (
      <Dropdown
        text="Choose an option"
        icon={<AddIcon />}
        value={this.state.selectedValue}
        isValid={!!this.state.selectedValue}
        invalidErrorMessage="Please pick an option"
        onChange={evt => this.setState({ selectedValue: evt.value })}
        options={
          [
            { value: 'option1', text: 'One option' },
            { value: 'option2', text: 'Another option', href: '#' },
            { value: 'option3', text: 'Best option' },
            { value: 'option5', text: 'Different option' },
            { value: 'option6', text: 'Longer named option that should overflow' }
          ]
        }
      />
    );
  }
}

export default DropdownIconExample;
