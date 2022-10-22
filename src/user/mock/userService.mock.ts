export const MOCK_CREATE_USER_RESPONSE = {
  id: 1,
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  deleted: false,
  profile: {
    bio: 'This is my fabulous biography',
  },
  post: [],
  role: null,
  updatedAt: '',
  createdAt: '2022-10-10T22:26:05.108Z',
  deletedAt: null,
  _count: {
    like: 0,
    post: 0,
    comment: 0,
  },
};

export const MOCK_CREATE_USER = {
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  password: 'mock_password',
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const MOCK_UPDATE_USER = {
  firstName: 'mock_first_name_update',
  lastName: 'mock_last_name_update',
  email: 'mock_email@email.com',
  password: 'mock_password',
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
};

export const FIND_ALL_USER_MOCK_RESPONSE = [
  {
    id: 1,
    firstName: 'mock_first_name',
    lastName: 'mock_last_name',
    email: 'mock_email@email.com',
    role: null,
    deleted: false,
    createdAt: '2022-10-10T22:26:05.108Z',
  },
];

export const FIND_ONE_USER_MOCK_RESPONSE = {
  id: 1,
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  deleted: false,
  profile: {
    bio: 'This is my fabulous biography',
  },
  post: [],
  role: null,
  updatedAt: '2022-10-10T22:36:33.109Z',
  createdAt: '2022-10-10T22:26:05.108Z',
  deletedAt: null,
  _count: {
    like: 0,
    post: 0,
    comment: 0,
  },
};
