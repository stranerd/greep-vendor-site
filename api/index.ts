import AuthRepository from "./AuthRepository";
import MarketplaceRepository from "./MarketplaceRepository";
import UserRepository from "./UserRepository";

export default {
  auth: AuthRepository(),
  marketplace: MarketplaceRepository(),
  users: UserRepository(),
};
