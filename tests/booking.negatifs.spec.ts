import { test, expect } from '@playwright/test'
import { defaultBooking } from '../utils/booking.data';
import { addBook } from '../utils/booking.helper';

test.describe('Tests négatifs', () => {

    test('PUT sans token → 403 et booking inchangé', async ({ request }) => {

        const bookid = await addBook(request, defaultBooking);

        const bookupdate = {
            ...defaultBooking,
            firstname: 'firstfirst'
        }
        const req = await request.put(`/booking/${bookid}`, { data: bookupdate });
        expect(req.status()).toBe(403);

        const reqget = await request.get(`/booking/${bookid}`);
        expect(reqget.status()).toBe(200);
        const json = await reqget.json();
        expect(json.firstname).toBe(defaultBooking.firstname);
    })

})
