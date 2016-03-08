// @flow
import React from 'react';
const { number } = React.PropTypes;

export default class Component extends React.Component {
  static propTypes = {
    first: number.isRequired,
    second: number.isRequired
  };
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      first: props.first,
      second: props.second
    };
  }

  render(): any {
    const { first, second } = this.state;
    return (
      <div>
        {first} + {second} = {sum(this.state)}
      </div>
    );
  }
}

function sum(state: ComponentState): number {
  return state.first + state.second;
}
