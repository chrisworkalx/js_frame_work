import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/modal';

// eslint-disable-next-line react-refresh/only-export-components
const Child = () => {
  return <div className="modal">这个是通过ReactDOM.createPortal创建的内容</div>;
};

export default class TwentyFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击加1</button>
        <Link to="/">到首页</Link>
        <p>点击次数: {this.state.clicks}</p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}
