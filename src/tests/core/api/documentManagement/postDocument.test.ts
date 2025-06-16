import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateReceipt, GenerateResponse } from '../../../../core/api/documentManagement/postDocument.js'
import * as SessionsManager from '../../../../core/session/SessionsManager.js'

describe('generateReceipt', () => {
    const leaseId = 42
    const jwt = 'fake-jwt'
    const baseUrl = 'http://api.test'
    const bucketName = 'locaccm-bucket'
    const userId = '123'
    const fullUrl = `${baseUrl}/api/rent-receipt`

    let getUserIdMock: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        ;(import.meta.env as any).VITE_API_URL_DOCUMENT_MANAGEMENT = baseUrl
        global.fetch = vi.fn()
        getUserIdMock = vi
            .spyOn(SessionsManager, 'getUserId')
            .mockReturnValue(userId)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('calls fetch with correct URL, method, headers and returns JSON', async () => {
        const mockResponse: GenerateResponse = { pdfUrl: 'http://url/to/receipt.pdf' }
        // @ts-expect-error stub fetch
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        })

        const result = await generateReceipt(leaseId, jwt)
        expect(result).toEqual(mockResponse)

        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ leaseId, bucketName, userId }),
        })
    })

    it('throws "User not logged in" if getUserId returns null', async () => {
        getUserIdMock.mockReturnValueOnce(null)

        await expect(generateReceipt(leaseId, jwt))
            .rejects.toThrowError('User not logged in')

        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).not.toHaveBeenCalled()
    })

    it('throws "Not authenticated" if status is 401', async () => {
        // @ts-expect-error stub fetch
        global.fetch.mockResolvedValueOnce({ ok: false, status: 401 })

        await expect(generateReceipt(leaseId, jwt))
            .rejects
            .toThrowError('Not authenticated')

        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('throws generic error for other HTTP status', async () => {
        // @ts-expect-error stub fetch
        global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })

        await expect(generateReceipt(leaseId, jwt))
            .rejects
            .toThrowError('Erreur 500 lors de la génération')

        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })
})
