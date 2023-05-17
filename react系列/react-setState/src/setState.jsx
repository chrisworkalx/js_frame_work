// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

export default class SetStateComp extends Component {
  state = {
    num: 1
  };

  renderButtonGrounps = () => {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={this.handleClick}>react合成事件触发</button>
        <button ref={(e) => (this.btnRef = e)}>原生点击事件</button>
      </div>
    );
  };

  handleClick = () => {
    this.setState(
      {
        num: this.state.num + 1
      },
      () => {
        console.log(this.state.num, '第1次'); //7
      }
    );
    this.setState(
      {
        num: this.state.num + 1
      },
      () => {
        console.log(this.state.num, '第2次'); //7
      }
    );
    this.setState(
      {
        num: this.state.num + 3
      },
      () => {
        console.log(this.state.num, '第3次'); //7
      }
    );

    console.log(this.state.num); // react版本 18.2 输出依然是4
  };

  nativeHandleClick = () => {
    this.setState({
      num: this.state.num + 1
    });
    this.setState({
      num: this.state.num + 1
    });
    this.setState({
      num: this.state.num + 3
    });

    console.log(this.state.num); // react版本 18.2 输出依然是4
  };

  componentDidMount() {
    // this.setState({
    //   num: this.state.num + 1
    // });
    // this.setState({
    //   num: this.state.num + 1
    // });
    // this.setState({
    //   num: this.state.num + 3
    // });

    // 放在setTimeout结果同上面一样
    setTimeout(() => {
      this.setState({
        num: this.state.num + 1
      });
      this.setState({
        num: this.state.num + 1
      });
      this.setState({
        num: this.state.num + 3
      });
      console.log(this.state.num);
    });
    // console.log(this.state.num); //react版本 18.2 输出结果都是this.state.num ---> 1

    this.btnRef.addEventListener('click', this.nativeHandleClick, false);
  }

  componentWillUnmount() {
    this.btnRef.removeEventListener('click', this.nativeHandleClick, false);
  }

  render() {
    const { num } = this.state;
    return (
      <div>
        {/* 页面显示2 */}
        <h1>{num}</h1>
        {this.renderButtonGrounps()}
      </div>
    );
  }
}
