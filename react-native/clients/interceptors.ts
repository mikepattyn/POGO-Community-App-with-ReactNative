import { AxiosRequestConfig, AxiosError } from "axios";

import { isNullOrUndefined } from "util";

export const requestInterceptor = async (config: AxiosRequestConfig) => {
    if (!isNullOrUndefined(config) && !isNullOrUndefined(config.headers) && !isNullOrUndefined(config.headers.common)) {
        config.headers["Accept"] = "application/json";
        config.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pa2VAZ2l2dGFwcC5uZXQiLCJpYXQiOjE1ODExNDQwMzQsImV4cCI6MTU4MTE4NzIzNH0.hWxO-xDJjbE_0Q0HS-mmcX8bTRpOVibWooHw3j9IDz0";
    }
    return Promise.resolve(config);
}
export const errorInterceptor = async (error: AxiosError) => {
    return Promise.reject(error);
}