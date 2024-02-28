import { SafeAny } from "@core/types/Safe";

export const Utils = {
    common: {
        //防抖 多次点击执行最后一次
        debouncing: function <T extends Array<any>, R>(func: (...args: T) => R, delay: number): (...args: T) => void {
            let timer: any = null;
            return (...args: T) => {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    func.apply(this, args)
                }, delay)
            }
        },
        //节流 多次点击，隔一段时间才能执行一次 
        throttle: function <T extends Array<any>, R>(func: (...args: T) => R, delay: number): (...args: T) => void {
            let timer: any = null;
            return (...args: T) => {
                if (!timer) {
                    func.apply(this, args);
                    timer = setTimeout(() => {
                        clearTimeout(timer)
                        timer = null;
                    }, delay);
                }
            };
        },

        clearEmpty: (params: SafeAny) => {
            const _params: SafeAny = {};
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const element = params[key];
                    if (element) _params[key] = element
                }
            }
            return _params
        }
    },
    storage: {
        set: (key: string, value: any) => {
            // 执行监听的操作
            return localStorage.setItem(`${key}`, value);
        },
        get: (key: string) => {
            // 执行监听的操作
            return localStorage.getItem(`${key}`);
        },
        del: (key: string) => {
            3;
            // 执行监听的操作
            return localStorage.removeItem(`${key}`);
        },
        clear: () => {
            // 执行监听的操作
            localStorage.clear();
        }
    }
};
