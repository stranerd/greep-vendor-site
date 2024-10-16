import { useAuthStore } from "@/store/useAuthStore";
import { GP_CONSTANTS } from "~/constants";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userType = JSON.parse(
    localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string,
  );
  if (userType === null) {
    return abortNavigation("");
  }
  if (userType.type === "vendor") {
    return true;
  } else {
    return abortNavigation();
  }
});
