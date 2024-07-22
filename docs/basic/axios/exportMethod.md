# 前端文件流下载

## 直接在封装axios实例的地方暴露

```ts
import axios from 'axios'
const server = axios.create({
    baseURL: '',
    timeout: 10000
})
server.interceptors.request.use(
    (config:any) => {
        // 请求拦截器，可以设置一些请求头部参数
        return config
    }, 
    (err:any) => {
        return Promise.reject(error)
    }
)

server.interceptors.response.use(
    (res:any) => {
        // 响应拦截器，可以根据状态码判断
        return res.data;
    },
    (err:any) => {
        return Promise.reject(error.response)
    }
)
type Method = 'get'|'GET'|'post'|'POST'

export const exportMethod = (url: string , method: Method, fileName: string, params?: any, data?: object) => {
    return new Promise((reslove, reject) => {
        server({
            url: url,
            method: method,
            params: params,
            data: data,
            config: {
                responseType: "blob",
            }
        }).then((res: any) => {
            console.log(res.data)   /* Blob{ size: 3657, type: "multipart/form-data" }*/
            if (res.data.size <= 0) return
            // 执行下载操作
            let url = window.URL.createObjectURL(new Blob([res.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            resolve(res)
        }).catch(err:any) => {
            reject(err)
        }
    })
}

```

## pdf文件流下载并预览

**调用的实际接口**
``` js
import { get, post, getBlob, previewPdf } from '@/utils/http';

// 下载
export const downloadInvoicePdf = params => {
    return getBlob('/leEnterpriseCommon/downLoad', params);
};
// 预览
export const previewInvoicePdf = params => {
    return previewPdf('/leEnterpriseCommon/downLoad', params);
};
```

**封装下载流**
```js
// get 请求
export function getBlob (url, params) {
    const { fileName } = params;
    return new Promise((resolve, reject) => {
        http.get(
            url,
            params,
            { responseType: 'blob' }
        ).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}
// 同一个接口,返回文件流直接预览文件
export function previewPdf (url, params) {
    const { previewTitle } = params;
    return new Promise((resolve, reject) => {
        http.get(
            url,
            params,
            { responseType: 'blob' }
        ).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res], {
                type: 'application/pdf;chartset=UTF-8'
            }));
            openNewWindow(url, previewTitle);
        }).catch((err) => {
            reject(err);
        });
    });
}
// window.open 自定义标题 完美解决方案
export function openNewWindow (url, title) {
    const win = window.open('about:blank');
    win.document.title = title;
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.overflow = 'hidden';
    iframe.style.border = 'none';
    win.document.body.style.margin = '0';
    win.document.body.appendChild(iframe);
}
```