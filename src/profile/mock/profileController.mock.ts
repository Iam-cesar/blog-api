export const MOCK_FIND_ONE_PROFILE_RESPONSE = {
  id: 1,
  bio: 'This is my fabulous biography',
  userId: 1,
  createdAt: '2022-10-16T17:00:22.056Z',
  updatedAt: null,
};

export const MOCK_CREATE_PROFILE = {
  bio: 'mock biography',
  user: { connect: { id: 1 } },
};

export const MOCK_UPDATE_PROFILE = {
  id: 1,
  bio: 'this bio was updated',
  userId: 1,
  createdAt: '2022-10-16T17:00:22.056Z',
  updatedAt: '2022-10-16T17:00:22.056Z',
};
