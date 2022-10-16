export const MOCK_CREATE_RESPONSE = {
  id: 2,
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  deleted: false,
  profile: {
    bio: 'This is my fabulous biography',
  },
  post: [],
  role: null,
  updatedAt: null,
  createdAt: null,
  deletedAt: null,
  _count: {
    like: 0,
    post: 0,
    comment: 0,
  },
};

export const MOCK_CREATE = {
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  password: 'mock_password',
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const MOCK_UPDATE = {
  firstName: 'mock_first_name_update',
  lastName: 'mock_last_name_update',
  email: 'mock_email@email.com',
  password: 'mock_password',
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const FIND_ALL_MOCK_RESPONSE = [
  {
    id: 2,
    firstName: 'mock_first_name',
    lastName: 'mock_last_name',
    email: 'mock_email@email.com',
    role: null,
    deleted: false,
    createdAt: null,
  },
];

export const FIND_ONE_MOCK_RESPONSE = {
  id: 2,
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  deleted: false,
  profile: {
    bio: 'This is my fabulous biography',
  },
  post: [],
  role: null,
  updatedAt: null,
  createdAt: null,
  deletedAt: null,
  _count: {
    like: 0,
    post: 0,
    comment: 0,
  },
};
