export interface IProduct {
  id: string;
  title: string;
  description: string;
  banner: any;
  price: {
    amount: number;
    currency: string;
  };
  tagIds: Array<string>;
  inStock: boolean;
  user: {
    id: string;
    bio: {
      name: {
        first: string;
        last: string;
        full: string;
      };
      photo: any;
      username: string;
    };
    roles: {
      isAdmin: boolean;
      isSuperAdmin: boolean;
      isActive: boolean;
      isCustomer: boolean;
      isDriver: boolean;
    };
    publicName: string;
  };
  meta: {
    orders: number;
    total: number;
  };
  createdAt: number;
  updatedAt: number;
  __type: string;
  hash: string;
}

interface OrderUser {
  id: string;
  bio: {
    username: string;
    name: {
      first: string;
      last: string;
      full: string;
    };
    photo: any;
  };
  publicName: string;
  roles: {
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isActive: boolean;
    isCustomer: boolean;
    isDriver: boolean;
  };
}

export interface IOrders {
  id: string;
  userId: string;
  email: string;
  driverId: string;
  status: {
    created: {
      at: number;
    };
    paid: {
      at: number;
    };
    accepted: {
      at: number;
      message: string;
    };
    rejected: string | null;
    driverAssigned: {
      at: number;
    };
    shipped: any;
    cancelled: any;
    completed: any;
    refunded: any;
  };
  from: {
    location: string;
    description: string;
    coords: Array<number>;
  };
  to: {
    coords: Array<number>;
    location: string;
    description: string;
  };
  dropoffNote: string;
  time: {
    date: number;
    time: string;
  };
  discount: number;
  payment: string;
  data: {
    type: string;
    cartId: string;
    vendorId: string;
    products: [
      {
        amount: number;
        currency: string;
        id: string;
        quantity: number;
      },
    ];
  };
  fee: {
    vatPercentage: number;
    vat: number;
    fee: number;
    subTotal: number;
    total: number;
    payable: number;
    currency: string;
  };
  done: boolean;
  createdAt: number;
  updatedAt: number;
  ignoreInJSON: Array<string>;
  __type: string;
  hash: string;
  users: Array<OrderUser>;
  products: Array<IProduct>;
  activeStatus: "created" | "accepted" | "shipped";
}
