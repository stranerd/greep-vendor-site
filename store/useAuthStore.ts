import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import type {
  IUser,
  LoginPayload,
  SignUpPayload,
  IUserProfile,
} from "~/types/modules/authModel";
import { getCookieExpiration } from "~/lib/utils";
import { useToast } from "@/components/library/toast/use-toast";
import { GP_CONSTANTS } from "~/constants";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // state variables
    const user = ref({}) as Ref<IUser>;
    const userProfile = ref({}) as Ref<IUserProfile>;
    const isLoggedIn = ref(false) as Ref<boolean>;
    const apiLoadingStates = ref({
      login: API_STATES.IDLE,
      signup: API_STATES.IDLE,
      getUser: API_STATES.IDLE,
      getUserProfile: API_STATES.IDLE,
      updateUserProfile: API_STATES.IDLE,
      updateVendorProfile: API_STATES.IDLE,
      updateVendorRole: API_STATES.IDLE,
      exchangeTokens: API_STATES.IDLE,
      providerAuth: API_STATES.IDLE,
      forgotPassword: API_STATES.IDLE,
      resetPassword: API_STATES.IDLE,
      updatePassword: API_STATES.IDLE,
      sendVerificationMail: API_STATES.IDLE,
      verifyEmail: API_STATES.IDLE,
    });

    // getter equivalent
    const hasCompletedProfile = computed(
      () =>
        user.value?.allNames?.first &&
        user.value?.allNames?.last &&
        user.value?.allNames?.full,
    );

    const hasCompletedVendorProfile = computed(
      () =>
        userProfile.value?.vendor?.email &&
        userProfile.value?.vendor?.name &&
        userProfile.value?.vendor?.website &&
        userProfile.value?.vendor?.location?.location,
    );

    const hasVerifiedEmail = computed(() => user.value.isVerified);

    // methods
    const updateUser = (user: any) => (user.value = user);

    const loginUser = async (payload: LoginPayload) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      apiLoadingStates.value.login = API_STATES.LOADING;

      const { data, error } = await $api.auth.signin(payload);
      if (error.value) {
        console.log(error.value?.data);
        toast({
          variant: "destructive",
          title: "Authorization Error",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.login = API_STATES.ERROR;
        return { error: error.value };
      }
      if (data.value) {
        completeLogin(data);
        apiLoadingStates.value.login = API_STATES.SUCCESS;
      }
    };

    const signUpUser = async (payload: SignUpPayload) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      apiLoadingStates.value.signup = API_STATES.LOADING;

      const { data, error } = (await $api.auth.signup(payload)) as any;
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Authorization Error",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.signup = API_STATES.ERROR;
        return { error: error.value };
      } else if (data.value) {
        // completeLogin(data);
        console.log(data.value);

        const authToken = useCookie("authToken", {
          expires: getCookieExpiration(1000), // 1 hour
        });

        const refreshToken = useCookie("refreshToken", {
          expires: getCookieExpiration(24000), // 1 day
        });
        refreshToken.value = data?.value?.refreshToken;
        authToken.value = data?.value?.accessToken;

        if (process.client) {
          localStorage.setItem("authToken", data?.value?.accessToken);
          localStorage.setItem("verifyEmail", payload.email);
        }
        await sendVerificationMail();
        apiLoadingStates.value.signup = API_STATES.SUCCESS;
      }
    };

    const sendVerificationMail = async (navigate: boolean = true) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const router = useRouter();
      apiLoadingStates.value.sendVerificationMail = API_STATES.LOADING;

      const { data, error } =
        (await await $api.auth.sendVerificationMail()) as any;
      if (error.value) {
        apiLoadingStates.value.sendVerificationMail = API_STATES.ERROR;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
      } else if (data.value) {
        if (navigate) {
          router.push("/confirm-email");
        }

        apiLoadingStates.value.sendVerificationMail = API_STATES.SUCCESS;
      }
    };

    const verifyEmail = async (payload: { token: string }) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      apiLoadingStates.value.verifyEmail = API_STATES.LOADING;

      const { data, error } = (await await $api.auth.verifyEmail(
        payload,
      )) as any;
      if (error.value) {
        apiLoadingStates.value.verifyEmail = API_STATES.ERROR;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
      } else if (data.value) {
        if (process.client) {
          localStorage.removeItem("verifyEmail");
        }
        completeLogin(data);
        apiLoadingStates.value.verifyEmail = API_STATES.SUCCESS;
      }
    };

    const completeLogin = async (
      data: any,
      options: { route: string; exchangeToken: boolean } = {
        route: "/vendor",
        exchangeToken: true,
      },
    ) => {
      const authToken = useCookie("authToken", {
        expires: getCookieExpiration(1000), // 1 hour
      });
      if (options.exchangeToken) {
        const refreshToken = useCookie("refreshToken", {
          expires: getCookieExpiration(24000), // 1 day
        });
        refreshToken.value = data?.value?.refreshToken;
      }

      const router = useRouter();

      user.value = data?.value?.user;
      authToken.value = data?.value?.accessToken;
      localStorage.setItem("authToken", data?.value?.accessToken);
      await getUserProfile();
      isLoggedIn.value = true;
      options.route && router.push(options.route);
    };

    const getUser = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const router = useRouter();
      apiLoadingStates.value.getUser = API_STATES.LOADING;

      const { data, error } = await useAsyncData("user", () =>
        $api.auth.getUser(),
      );

      if (error.value) {
        apiLoadingStates.value.getUser = API_STATES.ERROR;

        router.push("/login");
        // toast({
        //   variant: "destructive",
        //   title: "Authorization Error",
        //   description: error.value?.data?.[0]?.message || "",
        // });
      } else if (data.value) {
        user.value.id = data.value.id;

        await getUserProfile();
        isLoggedIn.value = true;
        user.value = data.value;
        apiLoadingStates.value.getUser = API_STATES.SUCCESS;
      }
    };

    const getUserProfile = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const router = useRouter();
      apiLoadingStates.value.getUserProfile = API_STATES.LOADING;

      const { data, error } = (await await $api.users.getSingleUser(
        user.value.id,
      )) as any;
      if (error.value) {
        apiLoadingStates.value.getUserProfile = API_STATES.ERROR;
        // toast({
        //   variant: "destructive",
        //   title: "Authorization Error",
        //   description: error.value?.data?.[0]?.message || "",
        // });
      } else if (data.value) {
        console.log({ user: data.value });
        localStorage.setItem(GP_CONSTANTS.USER, JSON.stringify(data.value));
        localStorage.setItem(
          GP_CONSTANTS.USER_TYPE,
          JSON.stringify(data.value.type),
        );
        userProfile.value = data.value;

        apiLoadingStates.value.getUserProfile = API_STATES.SUCCESS;
      }
    };

    const exchangeToken = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const router = useRouter();
      apiLoadingStates.value.exchangeTokens = API_STATES.LOADING;

      const { data, error } = await $api.auth.exchangeToken();
      if (error.value) {
        console.log({ error }, "error");
        apiLoadingStates.value.exchangeTokens = API_STATES.ERROR;
        router.push("/login");
        // toast({
        //   variant: "destructive",
        //   title: "Authorization Error",
        //   description: "",
        // });
      } else if (data.value) {
        console.log(data.value);
        completeLogin(data, {
          route: "",
          exchangeToken: false,
        });
        apiLoadingStates.value.exchangeTokens = API_STATES.SUCCESS;
      }
    };

    const triggerForgotPassword = async (
      payload: any,
      navigate: boolean = true,
    ) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const router = useRouter();
      apiLoadingStates.value.forgotPassword = API_STATES.LOADING;

      const { data, error } = await $api.auth.sendResetPasswordMail(payload);
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.forgotPassword = API_STATES.ERROR;
        return { error: error.value };
      }
      if (data.value) {
        if (process.client) {
          localStorage.setItem("resetPasswordEmail", payload.email);
        }
        toast({
          title: "Token Sent",
          description: "Please check your email for the reset password token",
        });
        if (navigate) {
          router.push("/reset-password");
        }

        apiLoadingStates.value.forgotPassword = API_STATES.SUCCESS;
        return { data: data.value };
      }
    };

    const triggerResetPassword = async (payload: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      apiLoadingStates.value.resetPassword = API_STATES.LOADING;

      const { data, error } = await $api.auth.resetPasswordWithToken(payload);
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.resetPassword = API_STATES.ERROR;
      }
      if (data.value) {
        toast({
          title: "Successful",
          description: error.value?.data?.[0]?.message || "",
        });
        if (process.client) {
          localStorage.removeItem("resetPasswordEmail");
        }

        setTimeout(() => {
          completeLogin(data);
          apiLoadingStates.value.resetPassword = API_STATES.SUCCESS;
        }, 1000);
      }
    };

    const updateUserPassword = async (payload: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      apiLoadingStates.value.updatePassword = API_STATES.LOADING;

      const { data, error } = await $api.auth.updatePassword(payload);
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.updatePassword = API_STATES.ERROR;
      }
      if (data.value) {
        toast({
          title: "Successful",
          description: error.value?.data?.[0]?.message || "",
        });

        setTimeout(() => {
          apiLoadingStates.value.updatePassword = API_STATES.SUCCESS;
          completeLogin(data);
        }, 1000);
      }
    };

    const updateUserProfile = async (payload: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      apiLoadingStates.value.updateUserProfile = API_STATES.LOADING;

      const { data, error } = await $api.auth.updateUserProfile(payload);
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.updateUserProfile = API_STATES.ERROR;
      }
      if (data.value) {
        toast({
          title: "Successful",
          description: error.value?.data?.[0]?.message || "",
        });
        user.value = data.value;
        apiLoadingStates.value.updateUserProfile = API_STATES.SUCCESS;
      }
    };

    const updateVendorProfile = async (payload: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      apiLoadingStates.value.updateVendorProfile = API_STATES.LOADING;

      const { data, error } = await $api.users.updateVendorDetails(payload);
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.updateVendorProfile = API_STATES.ERROR;
      }
      if (data.value) {
        toast({
          title: "Successful",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.updateVendorProfile = API_STATES.SUCCESS;
      }
    };

    const updateVendorRoles = async (payload: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      console.log({ user: user.value });

      apiLoadingStates.value.updateVendorRole = API_STATES.LOADING;
      const { data, error } = await $api.users.updateVendorType(payload);
      if (error.value) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.updateVendorProfile = API_STATES.ERROR;
      }
      if (data.value) {
        await getUserProfile();

        toast({
          title: "Successful",
          description: error.value?.data?.[0]?.message || "",
        });
        apiLoadingStates.value.updateVendorProfile = API_STATES.SUCCESS;
      }
    };

    return {
      user,
      hasCompletedProfile,
      updateUser,
      exchangeToken,
      isLoggedIn,
      loginUser,
      signUpUser,
      getUser,
      apiLoadingStates,
      // loginProvider,
      triggerResetPassword,
      triggerForgotPassword,
      updateUserPassword,
      getUserProfile,
      userProfile,
      updateUserProfile,
      updateVendorProfile,
      updateVendorRoles,
      hasCompletedVendorProfile,
      verifyEmail,
      sendVerificationMail,
      hasVerifiedEmail,
    };
  },
  { persist: true },
);
