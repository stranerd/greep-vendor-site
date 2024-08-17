const data = {
  id: "66629b10c4f0e7001199b7b2",
  userId: "660a7df4eb3b8f4cee9e89dc",
  driverId: null,
  status: {
    created: {
      at: 1717738256282,
    },
    paid: {
      at: 1717738256282,
    },
    accepted: {
      at: 1717738256282,
    },
    rejected: null,
    driverAssigned: {
      at: 1717738256282,
    },
    shipped: {
      at: 1717738256282,
    },
    cancelled: null,
    completed: {
      at: 1717738256282,
    },
    refunded: null,
  },
  from: {
    coords: [9.065482399999999, 7.4419364],
    location: "KKTC",
    description: "Location",
  },
  to: {
    coords: [2, 4],
    location: "hamitloy ",
    description: "Location",
  },
  dropoffNote: "Drop it on the front door",
  time: {
    date: 1717794000000,
    time: "12:00",
  },
  discount: 0,
  payment: "wallet",
  data: {
    type: "cart",
    cartId: "66629ae3c4f0e7001199b79f",
    vendorId: "660a7df4eb3b8f4cee9e89dc",
    packs: [
      [
        {
          price: {
            amount: 120,
            currency: "NGN",
          },
          id: "6658088d7a8efe5ad9fa38f2",
          quantity: 1,
          addOns: [],
        },
      ],
    ],
  },
  fee: {
    vatPercentage: 0.05,
    vat: 73060.92261,
    fee: 13095.32839920711,
    subTotal: 1461218.4522,
    total: 1547374.7032092072,
    payable: 1547374.7032092072,
    currency: "TRY",
  },
  done: true,
  offers: [],
  createdAt: 1717738256283,
  updatedAt: 1718103861123,
  __hash: "b4ca0392c50e8e142f07",
  __type: "OrderEntity",
  users: {
    "660a7df4eb3b8f4cee9e89dc": {
      id: "660a7df4eb3b8f4cee9e89dc",
      bio: {
        username: "jerryg",
        name: {
          first: "Jerry",
          last: "Godwin",
          full: "Jerry Godwin",
        },
        photo: {
          link: "https://lh3.googleusercontent.com/a/ACg8ocJVi8O8_pLZUZF5pHptTBt17CwJfwowHGAcAfp3dksN-e0=s96-c",
          type: "image/png",
        },
      },
      publicName: "Jerry",
      roles: {
        isAdmin: true,
        isVendor: true,
        isVendorFoods: true,
      },
    },
  },
  products: {
    "6658088d7a8efe5ad9fa38f2": {
      id: "6658088d7a8efe5ad9fa38f2",
      title: "burconger",
      price: {
        amount: 120,
        currency: "NGN",
      },
      banner: {
        name: "burger pic.jpeg",
        type: "image/jpeg",
        size: 82467,
        duration: 0,
        path: "storage/development/marketplace/banners/1717045389960-burger%20pic.jpeg",
        timestamp: 1717045389960,
        link: "https://development.apis.greep.io/api/storage/development/marketplace/banners/1717045389960-burger%20pic.jpeg",
      },
      user: {
        id: "660a7df4eb3b8f4cee9e89dc",
        bio: {
          name: {
            first: "Jerry",
            last: "Godwin",
            full: "Jerry Godwin",
          },
          photo: {
            link: "https://lh3.googleusercontent.com/a/ACg8ocJVi8O8_pLZUZF5pHptTBt17CwJfwowHGAcAfp3dksN-e0=s96-c",
            type: "image/png",
          },
          username: "jerryg",
        },
        roles: {
          isAdmin: true,
          isVendor: true,
          isVendorFoods: true,
        },
        publicName: "Jerry",
      },
      addOns: {},
    },
  },
  timeline: [
    {
      status: "created",
      title: "Order Placed",
      at: 1717738256282,
      done: true,
    },
    {
      status: "accepted",
      title: "Order Accepted",
      at: 1717738256282,
      done: true,
    },
    {
      status: "shipped",
      title: "Order Shipped",
      at: 1717738256282,
      done: true,
    },
    {
      status: "completed",
      title: "Order Completed",
      at: 1717738256282,
      done: true,
    },
  ],
  activeStatus: null,
};
