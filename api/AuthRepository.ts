import type { LoginPayload, SignUpPayload } from "~/types/modules/authModel";

const resource = "/auth";

export default () => {
  return {
    signin(payload: LoginPayload) {
      return useCustomFetch(`${resource}/emails/signin`, {
        body: payload,
        method: "POST",
      });
    },
    signup(payload: SignUpPayload) {
      return useCustomFetch(`${resource}/emails/signup`, {
        method: "POST",
        body: payload,
      });
    },
    //
    sendVerificationMail() {
      const refreshToken = useCookie("refreshToken");
      let authToken = "" as any;
      if (process.client) {
        authToken = localStorage.getItem("authToken");
      }
      return useCustomFetch(`${resource}/emails/verify/mail`, {
        method: "POST",
        headers: {
          "Refresh-Token": refreshToken.value ? refreshToken.value : "",
          "Access-Token": authToken ? authToken : "",
        },
      });
    },
    verifyEmail(payload: any) {
      return useCustomFetch(`${resource}/emails/verify`, {
        method: "POST",
        body: payload,
      });
    },
    getUser() {
      return useCustomAsyncFetch(`${resource}/user`);
    },
    deleteUserAccount(payload: any) {
      return useCustomFetch(`${resource}/user`, {
        method: "DELETE",
        body: payload,
      });
    },
    signout(payload: any) {
      return useCustomFetch(`${resource}/user/signout`, {
        method: "POST",
        body: payload,
      });
    },
    exchangeToken() {
      const refreshToken = useCookie("refreshToken");
      let authToken = "" as any;
      if (process.client) {
        authToken = localStorage.getItem("authToken");
      }

      return useCustomFetch(`${resource}/token`, {
        method: "POST",
        headers: {
          "Refresh-Token": refreshToken.value ? refreshToken.value : "",
          "Access-Token": authToken ? authToken : "",
        },
      });
    },
    updatePassword(payload: any) {
      return useCustomFetch(`${resource}/passwords/update`, {
        method: "POST",
        body: payload,
      });
    },
    resetPasswordWithToken(payload: any) {
      return useCustomFetch(`${resource}/passwords/reset`, {
        method: "POST",
        body: payload,
      });
    },
    sendResetPasswordMail(payload: any) {
      return useCustomFetch(`${resource}/passwords/reset/mail`, {
        method: "POST",
        body: payload,
      });
    },
    updateUserProfile(payload: any) {
      return useCustomFetch(`${resource}/user`, {
        method: "PUT",
        body: payload,
      });
    },
  };
};
