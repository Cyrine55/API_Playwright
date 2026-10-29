import { test, expect } from '@playwright/test'
import { getToken,addBook } from '../utils/booking.helper';
test.describe('PATCH METHOD', () => {


test('DELETE BOOK ', async ({ request }) => {
const token=await getToken(request);
const booking = {
    firstname: 'tedst',
    lastname: 'ccdccc',
    totalprice: 45643,
    depositpaid: true,
    bookingdates: {
        checkin: '2026-11-01',
        checkout: '2026-11-05'
    },
    additionalneeds: 'ffeefefe'
};
const bookid=await addBook(request,booking);

const deletereq =await request.delete(`/booking/${bookid}`,
   { headers:{Cookie:`token=${token}`
}
   }
);
expect (deletereq.status()).toBe(201);

const getdeletedbook= await request.get(`/booking/${bookid}`);
expect (getdeletedbook.status()).toBe(404);


})

    })