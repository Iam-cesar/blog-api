const MOCK_ID = '1';
const MOCK_EMAIL = 'mock@email.com';

export const MOCK_FIND_ONE_COMMENT_RESPONSE = {
  id: '1',
  content: 'Bela maneira de ensinar a fazer comida ein S2',
  post: {
    id: '2',
  },
  user: {
    id: '1',
    firstName: 'Cesar',
    lastName: 'Augusto',
  },
  like: [],
  createdAt: new Date('2022-10-18T12:36:24.742Z'),
  updatedAt: null,
  _count: {
    like: 0,
  },
};

export const MOCK_CREATE_COMMENT = {
  content: 'mock_comment_created',
  post: { connect: { id: MOCK_ID } },
  user: { connect: { email: MOCK_EMAIL } },
  commentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};
