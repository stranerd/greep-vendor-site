const data = {
  pages: { start: 1, last: 1, next: null, previous: null, current: 1 },
  docs: { limit: 100, total: 1, count: 1 },
  results: [
    {
      id: "66629b10c4f0e7001199b7a8",
      userId: "660a7df4eb3b8f4cee9e89dc",
      driverId: null,
      status: {
        created: { at: 1717738256282 },
        paid: null,
        accepted: { at: 1718103861123, message: "Order accepted" },
        rejected: null,
        driverAssigned: null,
        shipped: null,
        cancelled: null,
        completed: null,
        refunded: null,
      },
      from: {
        coords: [9.065482399999999, 7.4419364],
        location: "KKTC",
        description: "Location",
      },
      to: { coords: [2, 4], location: "hamitloy ", description: "Location" },
      dropoffNote: "Drop it on the front door",
      time: { date: 1717794000000, time: "12:00" },
      discount: 0,
      payment: "wallet",
      data: {
        type: "cart",
        cartId: "66629ae3c4f0e7001199b79f",
        vendorId: "660a7df4eb3b8f4cee9e89dc",
        products: [
          {
            amount: 120,
            currency: "NGN",
            id: "6658088d7a8efe5ad9fa38f2",
            quantity: 1,
          },
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
      done: false,
      createdAt: 1717738256283,
      updatedAt: 1718103861123,
      __hash: "1b4d7dba861888d4f378",
      __type: "OrderEntity",
      users: [
        {
          id: "660a7df4eb3b8f4cee9e89dc",
          bio: {
            username: "jerryg",
            name: { first: "Jerry", last: "Godwin", full: "Jerry Godwin" },
            photo: {
              link: "https://lh3.googleusercontent.com/a/ACg8ocJVi8O8_pLZUZF5pHptTBt17CwJfwowHGAcAfp3dksN-e0=s96-c",
              type: "image/png",
            },
          },
          publicName: "Jerry",
          roles: { isAdmin: true, isVendor: true, isVendorFoods: true },
        },
        {
          id: "660a7df4eb3b8f4cee9e89dc",
          bio: {
            username: "jerryg",
            name: { first: "Jerry", last: "Godwin", full: "Jerry Godwin" },
            photo: {
              link: "https://lh3.googleusercontent.com/a/ACg8ocJVi8O8_pLZUZF5pHptTBt17CwJfwowHGAcAfp3dksN-e0=s96-c",
              type: "image/png",
            },
          },
          publicName: "Jerry",
          roles: { isAdmin: true, isVendor: true, isVendorFoods: true },
        },
      ],
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
          at: 1718103861123,
          done: true,
        },
        { status: "shipped", title: "Order Shipped", at: null, done: false },
        {
          status: "completed",
          title: "Order Completed",
          at: null,
          done: false,
        },
      ],
      activeStatus: "accepted",
    },
  ],
};
