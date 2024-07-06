export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
}

export interface IUser {
  hash: string;
  id: string;
  email: string;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  bio: {
    name: {
      first: string;
      middle: string;
      last: string;
    };
  };
  description: string;
  photo: any;
  isVerified: boolean;
  authTypes: Array<string>;
  phone?: { code: string; number: string };
  roles: any;
  lastSignedInAt: number;
  signedUpAt: number;
  allNames: {
    first: string;
    middle: string;
    last: string;
    full: string;
  };
}

export interface IUserProfile {
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
  dates: {
    createdAt: number;
    deletedAt: null | number;
  };
  roles: any;
  status: {
    connections: Array<any>;
    lastUpdatedAt: number;
  };
  account: {
    meta: {
      referrals: number;
      total: number;
      trips: number;
    };
    rankings: {
      daily: {
        value: number;
        lastUpdatedAt: number;
      };
      weekly: {
        value: number;
        lastUpdatedAt: number;
      };
      monthly: {
        lastUpdatedAt: number;
        value: number;
      };
      overall: {
        lastUpdatedAt: number;
        value: number;
      };
    };
    settings: {
      driverAvailable: boolean;
      notifications: boolean;
    };
    application: any;
    location: Array<any>;
    savedLocations: Array<any>;
    trips: any;
    vendorLocation: any;
  };
  type: any;
  vendor?: {
    email: string;
    location: { coords: Array<number>; location: string; description: string };
    name: string;
    website: string;
  };
  __type: any;
  hash: string;
  publicName: string;
}
