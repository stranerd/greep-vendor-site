import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import type {
  IUser,
  LoginPayload,
  SignUpPayload,
} from "~/types/modules/authModel";
import { getCookieExpiration } from "~/lib/utils";
import { useToast } from "@/components/library/toast/use-toast";

export const useAuthStore = defineStore("auth", () => {
  // state variables
  const user = ref({}) as Ref<IUser>;
  const userProfile = ref({}) as Ref<IUser>;
  const isLoggedIn = ref(false) as Ref<boolean>;
  const apiLoadingStates = ref({
    login: API_STATES.IDLE,
    signup: API_STATES.IDLE,
    getUser: API_STATES.IDLE,
    getUserProfile: API_STATES.IDLE,
    exchangeTokens: API_STATES.IDLE,
    providerAuth: API_STATES.IDLE,
    forgotPassword: API_STATES.IDLE,
    resetPassword: API_STATES.IDLE,
    updatePassword: API_STATES.IDLE,
  });

  // getter equivalent
  const getUserName = computed(() => user.value.firstName);

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
      completeLogin(data);
      apiLoadingStates.value.signup = API_STATES.SUCCESS;
    }
  };

  const completeLogin = (
    data: any,
    options: { route: string; exchangeToken: boolean } = {
      route: "/vendor",
      exchangeToken: true,
    }
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
    isLoggedIn.value = true;
    options.route && router.push(options.route);
  };

  const getUser = async () => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    const router = useRouter();
    apiLoadingStates.value.getUser = API_STATES.LOADING;

    const { data, error } = await useAsyncData("user", () =>
      $api.auth.getUser()
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
      console.log(data.value);
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
      user.value.id
    )) as any;
    if (error.value) {
      apiLoadingStates.value.getUserProfile = API_STATES.ERROR;
      // toast({
      //   variant: "destructive",
      //   title: "Authorization Error",
      //   description: error.value?.data?.[0]?.message || "",
      // });
    } else if (data.value) {
      console.log(data.value);
      isLoggedIn.value = true;
      user.value = data.value;
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

  // const loginProvider = async (provider: string, query: any) => {
  //   const { $api } = useNuxtApp();
  //   const router = useRouter();
  //   const { notify } = useNotification();

  //   apiLoadingStates.value.providerAuth = API_STATES.LOADING;

  //   const { data, error } = await $api.auth.providerAuth(provider, query);
  //   if (error.value) {
  //     notify({
  //       type: "error",
  //       title: "Authorization Error",
  //       text: error.value?.data?.error?.message || "",
  //     });
  //     apiLoadingStates.value.providerAuth = API_STATES.ERROR;
  //     setTimeout(() => {
  //       router.go(-2);
  //     }, 800);
  //   } else if (data.value) {
  //     notify({
  //       title: "Authorization completed",
  //       text: `Welcome ${
  //         data.value?.user?.firstName || data.value?.user?.username
  //       }`,
  //     });
  //     apiLoadingStates.value.providerAuth = API_STATES.SUCCESS;
  //     completeLogin(data);
  //   }
  // };

  const triggerForgotPassword = async (payload: any) => {
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
      router.push("/reset-password");
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

  return {
    user,
    getUserName,
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
  };
});
