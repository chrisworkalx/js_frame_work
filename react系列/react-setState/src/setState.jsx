// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export default class SetStateComp extends Component {
  state = {
    num: 1
  };

  componentDidMount() {
    // this.setState({
    //   num: this.state.num + 1
    // });
    // this.setState({
    //   num: this.state.num + 1
    // });
    // this.setState({
    //   num: this.state.num + 1
    // });
    // setTimeout(() => {
    //   this.setState({
    //     num: this.state.num + 1
    //   });
    //   this.setState({
    //     num: this.state.num + 1
    //   });
    //   this.setState({
    //     num: this.state.num + 1
    //   });
    //   console.log(this.state.num);
    // });
    //输出结果都是this.state.num ---> 1
  }

  render() {
    const { num } = this.state;
    return (
      <div>
        {/* 页面显示2 */}
        <h1>{num}</h1>
      </div>
    );
  }
}
