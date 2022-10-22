import { CategoryEntity } from '../entities/category.entity';

export const MOCK_FIND_ONE_CATEGORY_RESPONSE = {
  id: 1,
  name: 'gastronomia americana',
  createdAt: new Date('2022-10-17T13:40:43.553Z'),
  updatedAt: null,
  post: null,
};

export const MOCK_FIND_ALL_CATEGORY_RESPONSE = [
  new CategoryEntity(MOCK_FIND_ONE_CATEGORY_RESPONSE),
  new CategoryEntity({
    ...MOCK_FIND_ONE_CATEGORY_RESPONSE,
    id: MOCK_FIND_ONE_CATEGORY_RESPONSE.id + 1,
  }),
];

export const MOCK_CREATE_CATEGORY = {
  name: 'category_name',
};
