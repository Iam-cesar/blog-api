/*
  Warnings:

  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `passwordId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CategoryToPost_B_index";

-- DropIndex
DROP INDEX "_CategoryToPost_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Auth";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToPost";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER,
    "postId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("commentId", "id", "postId", "userId") SELECT "commentId", "id", "postId", "userId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("content", "id", "postId") SELECT "content", "id", "postId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "canCreatePost" BOOLEAN NOT NULL DEFAULT false,
    "canUpdatePost" BOOLEAN NOT NULL DEFAULT false,
    "canDeletePost" BOOLEAN NOT NULL DEFAULT false,
    "canSoftDeletePost" BOOLEAN NOT NULL DEFAULT false,
    "canCreateUser" BOOLEAN NOT NULL DEFAULT false,
    "canUpdateUser" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteUser" BOOLEAN NOT NULL DEFAULT false,
    "canSoftDeleteUser" BOOLEAN NOT NULL DEFAULT false,
    "canLikeUser" BOOLEAN NOT NULL DEFAULT false,
    "canLikePost" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME,
    "updatedAt" DATETIME
);
INSERT INTO "new_Role" ("canCreatePost", "canCreateUser", "canDeletePost", "canDeleteUser", "canLikePost", "canLikeUser", "canSoftDeletePost", "canSoftDeleteUser", "canUpdatePost", "canUpdateUser", "name") SELECT "canCreatePost", "canCreateUser", "canDeletePost", "canDeleteUser", "canLikePost", "canLikeUser", "canSoftDeletePost", "canSoftDeleteUser", "canUpdatePost", "canUpdateUser", "name" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "createdAt", "deleted", "id", "published", "title", "updatedAt") SELECT "authorId", "content", "createdAt", "deleted", "id", "published", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "role" TEXT,
    "hashedRefreshToken" TEXT,
    CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "deleted", "deletedAt", "email", "firstName", "id", "lastName", "password", "role", "updatedAt") SELECT "createdAt", "deleted", "deletedAt", "email", "firstName", "id", "lastName", "password", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("bio", "id", "userId") SELECT "bio", "id", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "postId" INTEGER,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    CONSTRAINT "Category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("id", "name") SELECT "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
