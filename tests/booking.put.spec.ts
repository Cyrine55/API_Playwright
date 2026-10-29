import { test, expect } from '@playwright/test';
import { getToken,addBook } from '../utils/booking.helper';

test.describe('PUT test', () => {

    test('update reservation', async ({ request }) => {

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

   const bookid=await addBook(request,booking)     

const bookupdate = {

            firstname: 'update',
            lastname: 'ccdccc',
            totalprice: 45643,
            depositpaid: true,
            bookingdates: {
                checkin: "2222-10-22",
                checkout: "4444-11-12"
            },
            additionalneeds: 'ffeefefe'
        }


        const req = await request.put(`/booking/${bookid}`,{data:bookupdate,
            headers:{Cookie:`token=${token}`
        
        
            }});

            console.log(req);
            expect (req.status()).toBe(200);

            const response= await req.json();
            expect (response).toHaveProperty('firstname');

            const newfirstname=response.firstname;
            expect (newfirstname).toBe(bookupdate.firstname);
        
            const objectget= await request.get(`/booking/${bookid}`)
            const objecteresult= await objectget.json();
            expect (objecteresult.firstname).toBe(bookupdate.firstname);
})

})