import { MutationCache, QueryClient } from '@tanstack/react-query'

import { mutationGlobalErrorHandler } from '../../shared/ui/util/query-error-handler-for-rhf-factory.ts'

export type MutationMeta = {
  globalErrorHandler?: 'on' | 'off';
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMeta
  }
}