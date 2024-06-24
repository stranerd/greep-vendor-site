export interface IChatMetaEntity {
  id: string;
  last: any;
  data: {
    sub: {
      type: string;
      orderId: string;
    };
    type: string;
  };
  members: Array<string>;
  createdAt: number;
  updatedAt: number;
  readAt: any;
  __hash: string;
  __type: string;
  users: Array<IChatUser>;
}

export interface IChatMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  links: Array<any>;
  media: any;
  data: {
    type: string;
    members: Array<string>;
  };
  createdAt: number;
  updatedAt: number;
  readAt: Record<string, number>;
  __hash: string;
  __type: string;
}

interface IChatUser {
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
  roles: any;
}
