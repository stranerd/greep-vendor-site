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
    DASHBOARD: "vendor-dashboard",
    USER_TYPE: "vendor-types",
    SETTINGS: "vendor-settings",
    SUPPORT: "vendor-support",
    PROMOTIONS: "vendor-promotions",
    PROMOTIONS_CREATE: "vendor-promotions create",

    WALLETS: {
      OVERVIEW: "vendor-wallet",
      WITHDRAW: "vendor-wallet withdraw",
      TRANSFER: "vendor-wallet transfer",
      DEPOSIT: "vendor-wallet deposit",
    },

    FOOD: {
      ORDERS: "food-orders",
      ORDER_DETAILS: "food-orders details",
      MENU: "food-menu",
      MENU_DETAILS: "food-menu-details",
    },

    ITEMS: {
      ORDERS: "items-orders",
      ORDER_DETAILS: "items-orders details",
      ITEMS_MANAGER: "items-manager",
      ITEM_DETAILS: "items-manager details",
    },
  };

  static CUSTOMERS = {
    DASHBOARD: "customers-dashboard",
  };
}
