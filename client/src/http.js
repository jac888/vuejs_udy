import axios from "axios";
import { Message, Loading } from "element-ui";

// @定義loading 動畫
let loading;
// 動畫開始
function loadingStart() {
  loading = Loading.service({
    //鎖定
    lock: true,
    text: "讀取中，請稍候...",
    background: "rgba(0,0,0,.7)"
  });
}

//動畫結束
function loadingEnd() {
  loading.close();
}

// 請求攔截 (request)

axios.interceptors.request.use(
  config => {
    //加載動畫
    loadingStart();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 響應攔截 (response)
axios.interceptors.response.use(
  response => {
    //結束加載動畫
    loadingEnd();
    return response;
  },
  error => {
    //錯誤提醒
    loadingEnd();
    Message.error(error.response.data);
    return Promise.reject(error);
  }
);

export default axios;
