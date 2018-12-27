import axios from "axios";
import { Message, Loading } from "element-ui";
import { stat } from "fs";
import router from "./router";

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
    //將token 存入 authorization header
    if (localStorage.accessToken)
      config.headers.Authorization = localStorage.accessToken;
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
    //get status error code is equal 401 token time is up.
    const { status } = error.response;

    //無效請求或Token過期
    if (status === 401) {
      //remove it from storage
      localStorage.removeItem("accessToken");
      Message.error("請重新登錄！");
      //back to login page
      router.push("/login");
    }
    //查無此電子郵件
    if (status === 400) {
      Message.error("查無此電子郵件");
      //back to login page
      router.push("/login");
    }
    //密碼錯誤
    if (status === 404) {
      Message.error("密碼錯誤");
      //back to login page
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axios;
