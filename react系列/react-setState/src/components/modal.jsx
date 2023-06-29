import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.body;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.style.width = '200px';
    this.el.style.height = '200px';
    this.el.style.backgroundColor = 'green';
    this.el.style.position = 'absolute';
    this.el.style.top = '200px';
    this.el.style.left = '400px';
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
