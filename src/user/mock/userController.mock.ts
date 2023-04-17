import { PostEntity } from '../..//post/entities/post.entity';
import { MOCK_CREATE_POST } from '../..//post/mock/postService.mock';

export const MOCK_CREATE_USER_RESPONSE = {
  id: '1',
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  deleted: false,
  profile: {
    bio: 'This is my fabulous biography',
  },
  post: [new PostEntity(MOCK_CREATE_POST)],
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
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};

export const MOCK_FIND_ALL_USER_RESPONSE = [
  {
    id: '1',
    firstName: 'mock_first_name',
    lastName: 'mock_last_name',
    email: 'mock_email@email.com',
    role: null,
    deleted: false,
    createdAt: null,
  },
];

export const MOCK_FIND_ONE_USER_RESPONSE = {
  id: '1',
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  email: 'mock_email@email.com',
  deleted: false,
  profile: {
    bio: 'This is my fabulous biography',
  },
  post: [new PostEntity(MOCK_CREATE_POST)],
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
