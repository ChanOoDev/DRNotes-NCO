import { describe, it, expect, vi, beforeEach } from 'vitest'

// Flexible mock chain builder
function createMockChain(finalResult: any = { data: [], error: null }) {
  const chain: Record<string, any> = {}
  const methods = ['select', 'eq', 'order', 'limit', 'insert', 'delete', 'update']

  let lastResult = finalResult
  for (const method of methods) {
    if (['insert', 'delete', 'update'].includes(method)) {
      // Terminal mutations
      chain[method] = vi.fn().mockReturnValue(chain)
      // Add chained methods for delete/update
      if (method === 'delete' || method === 'update') {
        chain.eq = vi.fn().mockReturnValue(Promise.resolve(lastResult))
      }
    } else {
      chain[method] = vi.fn().mockReturnValue(
        method === 'limit' || method === 'order' || method === 'select'
          ? Promise.resolve(lastResult)
          : chain
      )
    }
  }

  // eq() should resolve to final result when at end of chain
  chain.select = vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      limit: vi.fn().mockResolvedValue(lastResult),
    }),
    order: vi.fn().mockResolvedValue(lastResult),
  })

  return chain
}

const mockUser = { id: 'admin-1' }
const mockGetUser = vi.fn()
const mockFrom = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: { getUser: mockGetUser },
    from: mockFrom,
  })),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('admin users actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetUser.mockResolvedValue({ data: { user: mockUser } })
  })

  describe('getUsers', () => {
    it('rejects non-admin users', async () => {
      // Admin role check returns doctor
      mockFrom.mockReturnValueOnce({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: [{ roles: { name: 'doctor' } }],
              error: null,
            }),
          }),
        }),
      })

      const { getUsers } = await import('./actions')
      const result = await getUsers()

      expect(result.error).toBe('Unauthorized')
    })
  })

  describe('getRoles', () => {
    it('returns all roles', async () => {
      mockFrom.mockReturnValueOnce({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [{ id: 1, name: 'admin' }, { id: 2, name: 'doctor' }],
            error: null,
          }),
        }),
      })

      const { getRoles } = await import('./actions')
      const result = await getRoles()

      expect(result.data).toHaveLength(2)
      expect(result.data?.[0].name).toBe('admin')
    })
  })

  describe('toggleUserActive', () => {
    it('prevents admin from deactivating themselves', async () => {
      const { toggleUserActive } = await import('./actions')
      const result = await toggleUserActive('admin-1', false)

      expect(result.success).toBe(false)
      expect(result.error).toContain('cannot deactivate')
    })
  })
})
