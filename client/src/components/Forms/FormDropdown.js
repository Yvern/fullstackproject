import React, { Component } from 'react';
import M from 'materialize-css';

/*
* A React Component that allows the user to pick an item from a list of items.
*/
class DropDown extends Component {
  componentDidMount() {
    var elem = document.querySelectorAll('select');
    var instance = M.FormSelect.init(elem, {});
    console.log(instance);
  }

  render() {
    //initialise options
    const opts = [<option value="">{this.props.placeholder}</option>];
    this.props.options.forEach(function(e, i) {
      opts.push(<option value={e.value}>{e.text}</option>);
    });

    return (
      <div className="input-field select">
        <select {...this.props.input} className="select">
          {opts}
        </select>
        <label>{this.props.label}</label>
        <span className="helper-text" data-error="wrong" data-success="right">
          {this.props.meta
            ? this.props.meta.touched && this.props.meta.error
            : ''}
        </span>
      </div>
    );
  }
}

export default DropDown;
