/**
 * @Description  :websocket Api
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2022-12-09 10:59:08
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2022-12-16 11:37:43
 * @FilePath     : \\flexiv_cloud_frontend\\src\\utils\\websocket\\tool.js
 * @Copyright (C) 2022 mingfei.yao. All rights reserved.
 */
import { socketRequest } from './socket2';

/**
 * @description: 消息通知
 */
export function SApiMessageNotice(opt) {
  const wsProtocol = window.location.protocol.includes('https') ? 'wss://' : 'ws://';
  const wsUrl = `${wsProtocol}10.18.0.50:8080/provider/websocket/`;
  const {url = wsUrl, params = '', ...rest } = opt;
  return socketRequest({
    url,
    params,
    ...rest
  });
}
