import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { DocumentInfo, fetchDocuments } from '../../../../core/api/documentManagement/getDocument.js'

describe('fetchDocuments', () => {
    const jwt = 'fake-jwt'
    const baseUrl = 'http://api.test'
    const bucketName = 'locaccm-bucket'
    const fullUrl = `${baseUrl}/api/documents?bucketName=${bucketName}`

    beforeEach(() => {
        ;(import.meta.env as any).VITE_API_URL_DOCUMENT_MANAGEMENT = baseUrl
        ;(import.meta.env as any).VITE_BUCKET_UPLOAD_URL = 'http://localhost:4000'
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('appelle fetch avec GET et renvoie la liste mappée de DocumentInfo', async () => {
        const apiPayload = {
            documents: [
                { name: '123_invoice.pdf', url: 'u1', created: '2025-06-01T00:00:00Z' },
                { name: 'noid_file.txt',    url: 'u2', created: '2025-06-02T00:00:00Z' }
            ]
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

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        })
    })

    it('jette "Not authenticated" si status 401', async () => {
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({ ok: false, status: 401 })

        await expect(fetchDocuments(jwt)).rejects.toThrowError('Not authenticated')
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('jette une erreur générique pour un autre status', async () => {
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({ ok: false, status: 500 })

        await expect(fetchDocuments(jwt))
            .rejects
            .toThrowError('Erreur 500 lors du get documents')

        expect(global.fetch).toHaveBeenCalledTimes(1)
    })
})
