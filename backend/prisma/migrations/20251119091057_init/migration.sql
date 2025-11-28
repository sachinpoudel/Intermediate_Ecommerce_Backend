/*
  Warnings:

  - Added the required column `lineOne` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Address" ADD COLUMN     "lineOne" TEXT NOT NULL,
ADD COLUMN     "lineTwo" TEXT,
ADD COLUMN     "pinCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "defaultBillingAddressId" INTEGER,
ADD COLUMN     "defaultShippingAddressId" INTEGER;

-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "products" JSONB NOT NULL,
ADD COLUMN     "status" "public"."OrderEventStatus" NOT NULL DEFAULT 'PENDING';
