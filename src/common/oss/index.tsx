'use client'
import { message } from "antd";
import { genUpToken } from "./qiNiuTokenUtil";
import * as qiNiu from 'qiniu-js';

/**
 * 七牛云文件上传token生成
 */
export function getFileUploadToken(bucketName: string) {
    const policy = {
        scope: bucketName,
        deadline: Math.round(new Date().getTime() / 1000) + 3600,
    };

    return genUpToken(policy);
}

/**
 * 文件上传到七牛云
 */
export async function fileUpload(
    file: File,
    progressCallback?: (process: string) => void,
    bucketName?: string
) {
    const _bucketName = bucketName ?? 'maodouketang'
    // message.warning('正在上传中',1)          
    return new Promise((resolve, reject) => {
        const token = getFileUploadToken(_bucketName);
        const config = {
            useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
            region: void 0, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        };

        const observable = qiNiu.upload(file, null, token, {}, config);
        observable.subscribe({
            error: (err) => reject(err),
            complete: (res) => {
                message.success('上传成功')
                resolve(res)
            },
            next: (res) => {
                const progress = res.total.percent.toFixed(0);
                progressCallback && progressCallback(progress);
            },
        });
        //取消上传触发方法 'stop-upload'
        // const cancleUpload = () => subscription.unsubscribe();
    });
}

export function fileUpload2(file: File, bucketName = 'maodouketang') {
    const token = getFileUploadToken(bucketName);
    const config = {
        useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
        region: void 0, // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
    };

    const observable = qiNiu.upload(file, null, token, {}, config);
    return observable;
}