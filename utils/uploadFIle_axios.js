/**
 * @name DownLoad
 * @description 下载进度条
 */
import React, { Component } from 'react';
import axios from 'axios';

import Title from '@/component/Title';
import { Button, Progress, message } from 'antd';
import { unitConver } from '@/utils';

import styles from './styles.module.less';

export default class DownLoad extends Component {
  state = {
    progress: 0,
    visible: false,
    size: 0
  };
  /**
   * 下载
   * @param  {String} url 目标文件地址
   * @param  {String} filename 想要保存的文件名称
   */
  //第1PPT地址-/api-down-progress：跨域代理
  // /api-down-progress/uploads/soft/2006/1-200622214532.zip 1.63M
  // /api-down-progress/uploads/soft/2001/1-200121232528.zip 6.98M
  download = () => {
    let url = '/api-down-progress/uploads/soft/2001/1-200121232528.zip';
    this.setState({ visible: true, size: 0 });
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      // headers: { Authorization: token },
      onDownloadProgress: (evt) => {
        // console.log("progressEvent===",evt )
        // 对原生进度事件的处理
        this.setState({ progress: parseInt((evt.loaded / evt.total) * 100) });
      }
    })
      .then((res) => {
        // console.log("res===", res);
        let type = res.headers['content-type']; //请求头中文件类型
        let name = JSON.parse(
          res.headers['content-disposition'].split(';')[1].split('=')[1]
        ); //请求头中文件名
        // console.log("res===", res, type, name);
        const blob = new Blob([res.data]);
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a');
          elink.download = name;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, name);
        }

        setTimeout(() => {
          this.setState({ visible: false, progress: 0 });
        }, 3000);
      })
      .catch((err) => {
        this.setState({ visible: false });
        message.error('下载错误');
        console.log('下载错误', err);
      });
  };

  render() {
    const { visible, progress, size } = this.state;
    return (
      <div>
        <div className={styles.block}>
          <Title text="下载进度条" />
          {visible && (
            <div>
              <Progress percent={progress} />
              {unitConver(size)}
            </div>
          )}
          <Button onClick={this.download}>下载</Button>
        </div>
      </div>
    );
  }
}
