export const MOCK_CREATE_POST = {
  title: 'mock post title',
  content: 'Content post title',
};

export const MOCK_FIND_ALL_POST_RESPONSE = [
  {
    id: '1',
    title: 'Mock post title',
    createdAt: '2022-10-16T18:55:59.290Z',
  },
  {
    id: 2,
    title: 'Mock post title',
    createdAt: '2022-10-16T18:55:59.290Z',
  },
];

export const MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE = [
  {
    id: '1',
    title: 'Mock post title',
    category: [],
    published: false,
    updatedAt: null,
    deleted: false,
    createdAt: new Date('2023-01-07T19:44:13.661Z'),
    author: {
      id: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      Role: {
        name: 'mock',
      },
    },
    _count: {
      comment: 0,
      like: 0,
      category: 0,
    },
  },
  {
    id: '2',
    title: 'Mock post title',
    category: [],
    published: false,
    updatedAt: null,
    deleted: false,
    createdAt: new Date('2023-01-07T19:44:13.661Z'),
    author: {
      id: '1',
      firstName: 'firstName',
      lastName: 'lastName',
      Role: {
        name: 'mock',
      },
    },
    _count: {
      comment: 0,
      like: 0,
      category: 0,
    },
  },
];

export const MOCK_FIND_ONE_POST_RESPONSE = {
  id: '1',
  title: 'Mock post title',
  content: 'Mock post content',
  author: {
    id: '1',
    firstName: 'mock first name',
    lastName: 'mock user name',
  },
  category: [],
  published: false,
  comment: [],
  createdAt: new Date('2022-10-16T18:55:59.290Z'),
  deleted: false,
  like: [],
  updatedAt: null,
};

export const MOCK_UPDATE_POST = {
  title: 'mock post title updated',
  content: 'Content post title',
};
