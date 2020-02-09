import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { isNullOrUndefined } from "util";
import { injectable } from "inversify";
import { requestInterceptor, errorInterceptor } from "./interceptors";

@injectable()
export class ApiClient {

    private baseUrl: string | undefined = "http://localhost:3000/api/v1";

    constructor() {
        // Add a request interceptor
        axios.interceptors.request.use(requestInterceptor, errorInterceptor);
    }

    async post(url: string, body: any): Promise<AxiosResponse> {
        var retVal: AxiosResponse = { data: null, status: -1, statusText: "UhOh", headers: null, config: {} }

        const config: AxiosRequestConfig = {}

        if (!isNullOrUndefined(url))
            config.url = `${this.baseUrl}${url}`
        if (!isNullOrUndefined(body))
            config.data = body;

        await axios.post(config.url!, config.data)
            .then((response: AxiosResponse) => {
                retVal = response
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
        return retVal;
    }

    async get(url: string) {
        var retVal: AxiosResponse = { data: null, status: -1, statusText: "UhOh", headers: null, config: {} }

        const config: AxiosRequestConfig = {}

        if (!isNullOrUndefined(url))
            config.url = `${this.baseUrl}${url}`

        await axios.get(config.url!)
            .then((response: AxiosResponse) => {
                retVal = response
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
        return retVal;
    }
}

