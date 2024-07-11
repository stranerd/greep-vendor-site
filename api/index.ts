import type { IApiQuery } from "./../types/index.d";
import AuthRepository from "./AuthRepository";
import MarketplaceRepository from "./MarketplaceRepository";
import MessageRepository from "./MessageRepository";
import PaymentRepository from "./PaymentRepository";
import UserRepository from "./UserRepository";
import InteractionRepository from "./InteractionsRepository";

class ApiQuery {
  constructor(data: IApiQuery) {
    Object.assign(this, data);
  }
}

export default {
  auth: AuthRepository(),
  marketplace: MarketplaceRepository(),
  users: UserRepository(),
  payment: PaymentRepository(),
  messaging: MessageRepository(),
  interactions: InteractionRepository(),
  apiQuery: ApiQuery,
};
