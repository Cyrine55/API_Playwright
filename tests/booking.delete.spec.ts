import { test, expect } from '@playwright/test'
import { getToken,addBook,deletebook } from '../utils/booking.helper';
import { defaultBooking } from '../utils/booking.data';
test.describe('DELETE METHOD', () => {


test('DELETE BOOK ', async ({ request }) => {
const token=await getToken(request);

const bookid=await addBook(request,defaultBooking);

await deletebook(request,bookid,token)

const getdeletedbook= await request.get(`/booking/${bookid}`);
expect (getdeletedbook.status()).toBe(404);


})

    })