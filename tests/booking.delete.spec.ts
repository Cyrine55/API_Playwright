import { test, expect } from '@playwright/test'
import { getToken,addBook } from '../utils/booking.helper';
import { defaultBooking } from '../utils/booking.data';
test.describe('PATCH METHOD', () => {


test('DELETE BOOK ', async ({ request }) => {
const token=await getToken(request);

const bookid=await addBook(request,defaultBooking);

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