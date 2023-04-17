import { UserEntity } from '../../user/entities/user.entity';
import { MOCK_CREATE_USER } from '../../user/mock/userService.mock';

export const MOCK_CREATE_ROLE = {
  name: 'mock role',
  permitions: [],
};

export const MOCK_UPDATE_ROLE = {
  name: 'mock role updated',
  permitions: [],
};

export const MOCK_FIND_ONE_ROLE_RESPONSE = {
  id: '1',
  name: 'mock role',
  permitions: [],
  createdAt: '2022-10-16T13:42:52.937Z',
  updatedAt: null,
  user: new UserEntity(MOCK_CREATE_USER),
};

export const MOCK_FIND_ALL_ROLE_RESPONSE = [
  {
    id: '1',
    name: 'mock role',
    permitions: [],
  },
  {
    id: 2,
    name: 'mock role 2',
    permitions: [],
  },
];
