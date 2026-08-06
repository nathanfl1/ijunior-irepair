// 1202bdc3-11a5-4030-bfb0-a65d1d11a252

import axios from "axios";

export const api = axios.create({
    baseURL: "https://trainee.fidelis.workers.dev/api",

    headers: {
        Authorization: "Bearer 1202bdc3-11a5-4030-bfb0-a65d1d11a252"
    }
});

