export interface Wallet {
  id: string;
  userId: string;
  balance: {
    amount: number;
    currency: string;
  };
  createdAt: number;
  updatedAt: number;
  __type: string;
  hash: string;
  hasPin: boolean;
}
