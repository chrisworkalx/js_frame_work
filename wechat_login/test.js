const request = require('request');

const config = {
  //appId 跟 appSecret需要申请并认证成功后绑定
  // 测试号
  appId: '你的appId',
  appSecret: '你的appSecret',
  weChatUrl: 'https://api.weixin.qq.com/cgi-bin/',
  scope: {
    isDirectlyJump: 'snsapi_base',
    isRequiredAuth: 'snsapi_userinfo'
  },
  redirect_uri: 'http%3A%2F%2F192.168.0.109%3A8000%2FwechatLogin' //需要urlencode转化 需要在测试号网页授权配置相应的ip端口号等 默认支持8000
};

// 参考链接 微信开发者工具  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1

//下面跳转链接需要在微信开发工具中登录
const getWeChatAuthUrl =
  // 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=http%3A%2F%2F192.168.0.109%3A8000%2FwechatLogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${config.redirect_uri}&response_type=code&scope=${config.scope.isDirectlyJump}&state=STATE#wechat_redirect`;

//获取access_token
const requestTokenUrl = `${config.weChatUrl}token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`;

const fetchToGetAccessToken = async () => {
  return new Promise((resolve, reject) => {
    request(requestTokenUrl, function (error, response, body) {
      if (error) {
        reject(error);
      }
      const p = JSON.parse(body);
      resolve(p.access_token);
    });
  });
};

const getWeChatQrcode = async () => {
  const token = await fetchToGetAccessToken();
  // console.log(token, '===token');
  const qrcodeUrl = config.weChatUrl + 'qrcode/create?access_token=' + token;
  return new Promise(function (resolve, reject) {
    request(
      {
        url: qrcodeUrl,
        method: 'POST',
        json: true,
        body: {
          // expire_seconds: 120,
          // action_name: 'QR_SCENE',
          // action_info: {
          //   scene: {
          //     //scene_id	场景值ID，临时二维码时为32位非0整型，永久二维码时最大值为100000（目前参数只支持1--100000）
          //     scene_id: 123
          //   }
          // }
          expire_seconds: 60 * 10,
          action_name: 'QR_STR_SCENE',
          action_info: {
            scene: { scene_str: 'test' }
          }
        }
      },
      function (error, response, body) {
        if (error) {
          reject(error);
        }
        resolve(body);
      }
    );
  });
};

const getOpenId = async (code) => {
  console.log(code, '===from--获取code');
  const baseUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token';

  //获取openid需要在微信开发者工具中使用
  // https://api.weixin.qq.com/sns/oauth2/access_token?appid=AppID&secret=AppSecret&code=081bJA0006tTTN1f3x000qZOu01bJA05&grant_type=authorization_code
  return new Promise((resolve, reject) => {
    request(
      `${baseUrl}?appid=${config.appId}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`,
      function (error, response, body) {
        console.log(body, '===getOpenId===');
        if (error) {
          reject(error);
        }
        resolve(body);
      }
    );
  });
};

const getUserInfo = async (code) => {
  //获取用户信息
  const { access_token, openid } = await JSON.parse(await getOpenId(code));
  const baseUrl = 'https://api.weixin.qq.com/sns/userinfo';
  // 示例'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN';

  return new Promise((resolve, reject) => {
    request(
      `${baseUrl}?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
      function (error, response, body) {
        console.log(body, '===getUserInfo===');
        if (error) {
          reject(error);
        }
        resolve(body);
      }
    );
  });
};

module.exports = {
  fetchToGetAccessToken,
  getWeChatQrcode,
  getUserInfo
};
