import { send } from "process";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api-auth/login/",
        method: "POST",
        body,
      }),
    }),

    sendOtp: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api-auth/resend_code/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation } = authAPI;
