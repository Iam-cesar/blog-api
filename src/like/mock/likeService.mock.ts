export const MOCK_FIND_ONE_LIKE_RESPONSE = {
  id: '1',
  commentId: null,
  postId: '2',
  userid: '1',
  createdAt: new Date('2022-10-18T11:07:30.058Z'),
  updatedAt: null,
};

export const MOCK_COMMENT_WITH_LIKE = {
  id: '1',
  content: 'Bela maneira de ensinar a fazer comida ein S2',
  post: {
    id: '2',
  },
  user: {
    id: '1',
    firstName: 'mock_first_name',
    lastName: 'mock_last_name',
  },
  like: [
    {
      id: '2',
      user: {
        id: '1',
        firstName: 'mock_first_name',
        lastName: 'mock_last_name',
      },
    },
  ],
  createdAt: '2022-10-18T12:36:24.742Z',
  updatedAt: null,
  _count: {
    like: 1,
  },
};

export const MOCK_POST_WITH_LIKE = {
  id: '1',
  title: 'mock post title',
  content: 'Content post title',
  author: {
    id: '1',
    firstName: 'mock_first_name',
    lastName: 'mock_last_name',
  },
  category: [],
  published: false,
  comment: [
    {
      id: '1',
      createdAt: '2022-10-18T12:36:24.742Z',
      content: 'Bela maneira de ensinar a fazer comida ein S2',
      user: {
        id: '1',
        firstName: 'mock_first_name',
        lastName: 'mock_last_name',
      },
      like: [
        {
          id: '2',
          createdAt: '2022-10-20T18:47:51.890Z',
          user: {
            id: '1',
            firstName: 'mock_first_name',
            lastName: 'mock_last_name',
          },
        },
      ],
    },
  ],
  createdAt: '2022-10-17T13:28:43.543Z',
  deleted: false,
  like: [
    {
      id: '1',
      createdAt: '2022-10-18T11:07:30.058Z',
      user: {
        id: '1',
        firstName: 'mock_first_name',
        lastName: 'mock_last_name',
      },
    },
  ],
  updatedAt: null,
};

export const MOCK_CREATE_LIKE = {
  user: { connect: { id: '1' } },
  post: { connect: { id: '1' } },
};
