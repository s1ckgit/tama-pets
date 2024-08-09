/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import type { CustomPrismaError } from "@/lib/types";

export const prismaErrorMiddleware = (prismaActionFunction: any) => {
  return async function (...args: any) {
    try {
      const result = await prismaActionFunction(...args);
      return result;
    }
    catch(error: any) {
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
          error: {
            code: error.code
          }
        } as CustomPrismaError;
      }
      throw error;
    }
  };
};
