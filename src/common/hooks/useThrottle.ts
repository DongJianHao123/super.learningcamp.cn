import { useCallback } from "react"
import { Utils } from "../utils"

const useThrottle = (fun: (...args: any[]) => unknown, time: number) => {
    return useCallback(Utils.common.throttle(fun, time), [fun])
}

export default useThrottle