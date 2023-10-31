import { Prisma } from '@prisma/client';

export type TDataType =
  | (Prisma.Without<
      Prisma.CommentCreateInput,
      Prisma.CommentUncheckedCreateInput
    > &
      Prisma.CommentUncheckedCreateInput)
  | (Prisma.Without<
      Prisma.CommentUncheckedCreateInput,
      Prisma.CommentCreateInput
    > &
      Prisma.CommentCreateInput);

export interface IReqUserProps {
  email: string;
  id: string;
}
