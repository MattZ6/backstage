-- CreateTable
CREATE TABLE "errors" (
    "id" TEXT NOT NULL,
    "exception_was_thrown_in" TEXT NOT NULL,
    "resource_url" TEXT NOT NULL,
    "http_method" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);
