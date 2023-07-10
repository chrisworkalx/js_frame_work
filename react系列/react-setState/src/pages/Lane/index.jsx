import { Component } from 'react';
import { Button } from 'antd';

export default class Lane extends Component {
  state = { number: 0 };
  btnRef = null;
  handleClick = () => {
    this.setState((prev) => ({ number: prev.number + 2 }));
  };
  componentDidMount() {
    setTimeout(() => {
      console.log('-----initial----');
      this.setState({ number: 1 });
    }, 1000);
    setTimeout(() => {
      console.log('btn click', '---btn----event---');
      this.btnRef.click();
    }, 1040);
  }

  render() {
    const { number } = this.state;
    return (
      <div>
        <div>
          {Array.from(new Array(4500)).map((item, index) => {
            return (
              <span key={index} id={index}>
                {number}
              </span>
            );
          })}
        </div>
        <Button
          type="primary"
          ref={(ref) => {
            this.btnRef = ref;
          }}
          onClick={this.handleClick}
        >
          add 2
        </Button>
      </div>
    );
  }
}
