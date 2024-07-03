export class GP_ROUTES {
  static LOGIN = "login";
  static SIGN_UP = "create account";
  static FORGOT_PASSWORD = "forgot password";
  static CONFIRM_EMAIL = "confirm-email";
  static RESET_PASSWORD = "verify email";

  static HOME = "home";
  static PAYMENT = "payment";
  static PRODUCT = "product";
  static CONTACT = "contact";
  static ABOUT = "about";
  static NEWS = "news";
  static NEWS_PAGE = "news slug";

  static VENDOR = {
    DASHBOARD: "dashboard",
    USER_TYPE: "types",

    FOOD: {
      DASHBOARD: "food-dashboard",
      ORDERS: "food-orders",
      ORDER_DETAILS: "food-order-details",
      MENU: "food-menu",
      MENU_DETAILS: "food-menu-details",
      SETTINGS: "food-settings",
      SUPPORT: "food-support",
    },

    ITEMS: {
      DASHBOARD: "items-dashboard",
      ORDERS: "items-orders",
      ITEMS_MANAGER: "items-manager",
      SETTINGS: "items-settings",
      SUPPORT: "items-support",
    },
  };
}
