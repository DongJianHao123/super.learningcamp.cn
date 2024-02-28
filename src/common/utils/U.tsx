import { message } from "antd";
import { emailRule, passwordRule, phoneRule } from "../CTYPE";
import { SafeAny } from "@core/types/Safe";

const U = {
    price: {
        formatPrice: (value: SafeAny) => {
            value = value / 100;
            value += '';
            const list = value.split('.');
            const prefix = list[0].charAt(0) === '-' ? '-' : '';
            let num = prefix ? list[0].slice(1) : list[0];
            let result = '';
            while (num.length > 3) {
                result = `,${num.slice(-3)}${result}`;
                num = num.slice(0, num.length - 3);
            }
            if (num) {
                result = num + result;
            }
            return `¥ ${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
        },

        cent2yuan: (price: SafeAny, withSymbol: SafeAny) => {
            let ret: SafeAny = 0;
            if (!isNaN(price)) {
                ret = (price / 100).toFixed(2);
            }
            return (withSymbol ? '￥' : '') + ret;

        },

    },

    str: {
        hidePhoneNumber: (phone: string) => {
            // 检查输入的手机号是否为有效的11位数字
            if (U.str.isChinaMobile(phone)) {
                return phone.substring(0, phone.length - 8) + '****' + phone.substring(phone.length - 4);
            } else {
                return "Invalid phone number";
            }
        },
        rn2br: (str: string): string => {
            return str.replace(/(\r\n)|(\n)/g, '<br>');
        },
        isNull: (s: SafeAny): boolean => {
            return (s === null || typeof s === 'undefined');
        },
        isEmpty: (s: SafeAny): boolean => {
            if (U.str.isNull(s)) {
                return true;
            }
            if (typeof s != 'string') {
                return false;
            }
            return s.length === 0;
        },
        isNotEmpty: (s: string | null | undefined): boolean => {
            return !U.str.isEmpty(s);
        },
        trim: (x: string): string => {
            return x.replace(/^\s+|\s+$/gm, '');
        },
        isChinaMobile: (mobile = ''): boolean => {
            return phoneRule.test(mobile)
        },
        isValidEmail: (email: string): boolean => {
            return emailRule.test(email);
        },
        passwordValid: (password = ""): boolean => {
            return passwordRule.test(password)
        },
        randomString: (len: number) => {
            const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const maxIndex = chars.length;
            let s = '';
            for (let i = 0; i < len; i++) {
                s += chars.charAt(Math.floor(Math.random() * maxIndex));
            }
            return s;
        },
        copy: async (text: string) => {
            try {
                await navigator.clipboard.writeText(text);
                message.success('链接复制成功');
            } catch (err) {
                console.error('无法复制文本: ', err);
                message.warning('链接复制失败，请重试');
            }
        }
    },

    date: {
        remainingTime: (remainTime: number) => {
            const day: number = parseInt((remainTime / (24 * 3600 * 1000)).toString())

            const hour = parseInt(((remainTime % (24 * 3600 * 1000)) / 3600000).toString());

            const minute = parseInt(((remainTime % 3600000) / 60000).toString());

            const second = parseInt(((remainTime % 60000) / 1000).toString());

            let res = '';
            if (day > 0) {
                res = day + '天';
            } if (hour > 0) {
                res = res + (hour + '时')
            } if (minute > 0) {
                res = res + (minute + '分')
            }
            res = res + (second + '秒')

            return res;

        },
        format: (date: Date, fmt: string): (string | null) => {
            if (!date || !fmt) {
                return null;
            }
            const o: SafeAny = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
                'H+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                'S': date.getMilliseconds(),
            };
            const week: SafeAny = {
                '0': '\u65e5',
                '1': '\u4e00',
                '2': '\u4e8c',
                '3': '\u4e09',
                '4': '\u56db',
                '5': '\u4e94',
                '6': '\u516d',
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '')
                    .substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt
                    .replace(
                        RegExp.$1,
                        ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f'
                            : '\u5468')
                            : '')
                        + week[date.getDay() + '']);
            }
            for (const k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1,
                        (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k])
                            .substr(('' + o[k]).length)));
                }
            }
            return fmt;
        }
    },
    base64: {
        getBlobBydataURI: (dataURI: string, type: string) => {
            const binary = atob((dataURI || '').split(',')[1]);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type });
        }

    }
}

export default U;
