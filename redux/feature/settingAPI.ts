import { set } from "date-fns";
import baseApi from "../api/baseAPI";

const settingAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/auth/get_user_profile/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/update_user_profile/`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/update_password/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getTermsAndConditions: builder.query({
      query: () => ({
        url: `/dicipline/terms-conditions/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    setTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: `/dicipline/terms-conditions/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/api-apps/privacy_policies/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    setPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: `/api-apps/privacy_policies/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    getTrustAndSafety: builder.query({
      query: () => ({
        url: `/dicipline/trust-safety/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),

    setTrustAndSafety: builder.mutation({
      query: (data) => ({
        url: `/dicipline/trust-safety/`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetTermsAndConditionsQuery,
  useSetTermsAndConditionsMutation,

  useGetPrivacyPolicyQuery,
  useSetPrivacyPolicyMutation,
  useGetTrustAndSafetyQuery,
  useSetTrustAndSafetyMutation,
} = settingAPI;
