import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchDocuments, DocumentInfo } from '../../../../core/api/documentManagement/getDocument.js'
import * as SessionsManager from '../../../../core/session/SessionsManager.js'

describe('fetchDocuments', () => {
    const jwt = 'fake-jwt'
    const baseUrl = 'http://api.test'
    const bucketName = 'locaccm-bucket'
    const userId = '123'
    const fullUrl = `${baseUrl}/api/documents?bucketName=${bucketName}&userId=${userId}`

    let getUserIdMock: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        ;(import.meta.env as any).VITE_API_URL_DOCUMENT_MANAGEMENT = baseUrl
        ;(import.meta.env as any).VITE_BUCKET_UPLOAD_URL = 'http://localhost:4000'
        getUserIdMock = vi
            .spyOn(SessionsManager, 'getUserId')
            .mockReturnValue(userId)
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('appelle fetch avec GET et renvoie la liste mappée de DocumentInfo', async () => {
        const apiPayload = {
            documents: [
                { name: '123_invoice.pdf', url: 'u1', created: '2025-06-01T00:00:00Z' },
                { name: 'noid_file.txt',    url: 'u2', created: '2025-06-02T00:00:00Z' },
            ],
        }

        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(apiPayload),
        })

        const docs = await fetchDocuments(jwt)

        const expected: DocumentInfo[] = [
            {
                name: '123_invoice.pdf',
                url: 'http://localhost:4000/files/123_invoice.pdf',
                created: '2025-06-01T00:00:00Z',
                leaseId: 123,
            },
            {
                name: 'noid_file.txt',
                url: 'http://localhost:4000/files/noid_file.txt',
                created: '2025-06-02T00:00:00Z',
                leaseId: 0,
            },
        ]
        expect(docs).toEqual(expected)
        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        })
    })

    it('jette "User not logged in" si getUserId retourne null', async () => {
        getUserIdMock.mockReturnValueOnce(null)

        await expect(fetchDocuments(jwt)).rejects.toThrowError('User not logged in')
        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).not.toHaveBeenCalled()
    })

    it('jette "Not authenticated" si status 401', async () => {
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({ ok: false, status: 401 })

        await expect(fetchDocuments(jwt)).rejects.toThrowError('Not authenticated')
        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('jette une erreur générique pour un autre status', async () => {
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })

        await expect(fetchDocuments(jwt))
            .rejects
            .toThrowError('Erreur 500 lors du get documents')
        expect(getUserIdMock).toHaveBeenCalled()
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })
})
