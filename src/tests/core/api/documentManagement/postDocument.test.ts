import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {generateReceipt, GenerateResponse} from "../../../../core/api/documentManagement/postDocument.js";


describe('generateReceipt', () => {
    const leaseId = 42
    const jwt = 'fake-jwt'
    const baseUrl = 'http://api.test'
    const fullUrl = `${baseUrl}/api/rent-receipt`

    beforeEach(() => {
        ;(import.meta.env as any).VITE_API_URL = baseUrl
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('appelle fetch avec la bonne URL, méthode et headers, et renvoie le JSON', async () => {
        const mockResponse: GenerateResponse = { pdfUrl: 'http://url/to/receipt.pdf' }
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockResponse),
        })

        const result = await generateReceipt(leaseId, jwt)
        expect(result).toEqual(mockResponse)

        expect(global.fetch).toHaveBeenCalledOnce()
        expect(global.fetch).toHaveBeenCalledWith(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ leaseId }),
        })
    })

    it('jette une erreur "Not authenticated" si le status est 401', async () => {
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
        })

        await expect(generateReceipt(leaseId, jwt))
            .rejects
            .toThrowError('Not authenticated')

        expect(global.fetch).toHaveBeenCalledOnce()
    })

    it('jette une erreur générique pour un autre status HTTP', async () => {
        // @ts-expect-error mock global.fetch
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        })

        await expect(generateReceipt(leaseId, jwt))
            .rejects
            .toThrowError('Erreur 500 lors de la génération')

        expect(global.fetch).toHaveBeenCalledOnce()
    })
})
