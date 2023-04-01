import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// import { createContext } from '@/server/context';
import { appRouter } from '@/server/routes/_app';

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => {
      // return createContext(request);
      return {};
    },
  });
};

export const GET = handler;
export const POST = handler;
