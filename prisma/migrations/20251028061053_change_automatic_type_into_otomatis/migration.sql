/*
  Warnings:

  - The values [AUTOMATIC] on the enum `HppType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HppType_new" AS ENUM ('MANUAL', 'OTOMATIS');
ALTER TABLE "public"."Product" ALTER COLUMN "hppCalculationType" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "hppCalculationType" TYPE "HppType_new" USING ("hppCalculationType"::text::"HppType_new");
ALTER TYPE "HppType" RENAME TO "HppType_old";
ALTER TYPE "HppType_new" RENAME TO "HppType";
DROP TYPE "public"."HppType_old";
ALTER TABLE "Product" ALTER COLUMN "hppCalculationType" SET DEFAULT 'MANUAL';
COMMIT;
