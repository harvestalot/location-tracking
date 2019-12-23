
// import Vue from 'vue'
import axios from 'axios'
// Vue.prototype.axios = axios

// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'

const TIME_OUT_MS = 30 * 1000 // 默认请求超时时间
// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

/**
  * 请求失败后的错误统一处理
  * @param {Number} status 请求失败的状态码
  */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            // tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            // window.location.href='./visit_404.html';
            break;
        default:
            console.log(other);
            break;
    }
}

/*
 * @param response 返回数据列表
 */
function handleResults (response) {
    let remoteResponse = response.data
    var result = {
        success: false,
        message: '',
        status: [],
        errorCode: '',
        data: {
            total: 0,
            results: []
        }
    }
    if (remoteResponse.resultCode === "10000") {
        result.data.results = remoteResponse.data.result
        // result.data.total = remoteResponse.total
        result.success = true
    }
    if (remoteResponse.resultCode !== "10000") {
        let code = remoteResponse.errorCode
        if (code === 400) {
            console.log('传参错误')
        }
        result.errorCode = remoteResponse.errorCode
        result.message = remoteResponse.message
    }
    return result
    // return remoteResponse
}

function handleUrl (url) {
    url = "http://39.106.250.181:8890" + url    
    // url = BASE_URL + url    
// BASE_URL是接口的ip前缀，比如http:10.100.1.1:8989/
    return url
}

/*
 * @param data 参数列表
 * @return
 */
function handleParams (data) {
    return data
}

export default {
    /*
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    post (url, data, response, exception) {
        axios({
            method: 'post',
            url: handleUrl(url),
            data: handleParams(data),
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(
            (result) => {
                response(handleResults(result))
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    },
    /*
     * get 请求
     * @param url
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    get (url, response, exception) {
        axios({
            method: 'get',
            url: handleUrl(url),
            // data: handleParams(data),
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(
            (result) => {
                response(handleResults(result))
            }
        ).catch(
            (error) => {
                const { response } = error;
                if (response) {
                    // exception(error)
                    errorHandle(response.status, response.data.message)
                } else {
                    console.log(response.data.message)
                }
            }
        )
    },
    /*
     * 导入文件
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    uploadFile (url, data, response, exception) {
        axios({
            method: 'post',
            url: handleUrl(url),
            data: handleParams(data),
            dataType: 'json',
            processData: false,
            contentType: false
        }).then(
            (result) => {
                response(handleResults(result, data))
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    },
    /*
     * 下载文件用，导出 Excel 表格可以用这个方法
     * @param url
     * @param param
     * @param fileName 如果是导出 Excel 表格文件名后缀最好用.xls 而不是.xlsx，否则文件可能会因为格式错误导致无法打开
     * @param exception 异常的回调函数
     */
    downloadFile (url, data, fileName, exception) {
        axios({
            method: 'post',
            url: handleUrl(url),
            data: handleParams(data),
            responseType: 'blob'
        }).then(
            (result) => {
                const excelBlob = result.data
                if ('msSaveOrOpenBlob' in navigator) {
                    // Microsoft Edge and Microsoft Internet Explorer 10-11
                    window.navigator.msSaveOrOpenBlob(excelBlob, fileName)
                } else {
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    const blob = new Blob([excelBlob])
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    document.body.removeChild(elink)
                }
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    },
    uploadFileFormData (url, data, response, exception) {
        axios({
            method: 'post',
            url: handleUrl(url),
            data: data,
            timeout: TIME_OUT_MS,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (result) => {
                response(handleResults(result))
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    }
}