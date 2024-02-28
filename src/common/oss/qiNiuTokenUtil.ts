/**
 * Created by guohongjun on 2018/4/18.
 * 用户相关api
 */
import CryptoJS from 'crypto-js'
const defaultSettings = {
    accessKey: 'LxBU7AdbLDGBSVXV2UOyWvrmtBBqmcqXoQ2CzTxJ',
    secretKey: 'xEMWhlQ75Wl29WtNF2d25iEjTTa8xIcch0gNwww4',
};
/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free. You can redistribute it and/or modify it.
 */
/*
 * Interfaces: 
 * utf8 = utf16to8(utf16);
 * utf16 = utf8to16(utf8);
 */

function utf16to8(str: string) {
    let out, i, len, c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i);
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
    }
    return out;
}

/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
let base64EncodeChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function base64encode(str: string) {
    let out, i, len;
    let c1, c2, c3;
    len = str.length;
    i = 0;
    out = '';
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += '==';
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xf) << 2);
            out += '=';
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return out;
}

let safe64 = function (base64: string) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
};
let genUpToken = function (putPolicy: any) {
    //STEP 2
    let put_policy = JSON.stringify(putPolicy);
    //STEP 3
    let encoded = base64encode(utf16to8(put_policy));
    //STEP 4
    let hash = CryptoJS.HmacSHA1(encoded, defaultSettings.secretKey);
    let encoded_signed = hash.toString(CryptoJS.enc.Base64);
    //STEP 5
    return (
        defaultSettings.accessKey + ':' + safe64(encoded_signed) + ':' + encoded
    );
};
export { genUpToken };
