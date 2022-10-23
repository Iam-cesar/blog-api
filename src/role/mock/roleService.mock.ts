export const MOCK_CREATE_ROLE = {
  name: 'mock role',
  canCreatePost: false,
  canUpdatePost: false,
  canDeletePost: false,
  canSoftDeletePost: false,
  canCreateUser: false,
  canUpdateUser: false,
  canDeleteUser: false,
  canSoftDeleteUser: false,
  canLikeUser: false,
  canLikePost: false,
};

export const MOCK_UPDATE_ROLE = {
  name: 'mock role updated',
  canCreatePost: true,
  canUpdatePost: true,
  canDeletePost: true,
  canSoftDeletePost: true,
  canCreateUser: true,
  canUpdateUser: true,
  canDeleteUser: true,
  canSoftDeleteUser: true,
  canLikeUser: true,
  canLikePost: true,
};

export const MOCK_FIND_ONE_ROLE_RESPONSE = {
  id: '1',
  name: 'mock role',
  canCreatePost: false,
  canCreateUser: false,
  canDeletePost: false,
  canDeleteUser: false,
  canLikePost: false,
  canLikeUser: false,
  canSoftDeletePost: false,
  canSoftDeleteUser: false,
  canUpdatePost: false,
  canUpdateUser: false,
  createdAt: '2022-10-16T13:42:52.937Z',
  updatedAt: null,
  user: [],
};

export const MOCK_FIND_ALL_ROLE_RESPONSE = [
  {
    id: '1',
    name: 'mock role',
  },
  {
    id: 2,
    name: 'mock role 2',
  },
];
