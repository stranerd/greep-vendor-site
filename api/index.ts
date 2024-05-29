import AuthRepository from "./AuthRepository";
import MarketplaceRepository from "./MarketplaceRepository";
import PaymentRepository from "./PaymentRepository";
import UserRepository from "./UserRepository";

export default {
  auth: AuthRepository(),
  marketplace: MarketplaceRepository(),
  users: UserRepository(),
  payment: PaymentRepository(),
};
