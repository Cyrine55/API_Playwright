import { test, expect } from '@playwright/test';
import { getToken,addBook } from '../utils/booking.helper';
import { defaultBooking } from '../utils/booking.data';
test.describe('PUT test', () => {

    test('update reservation', async ({ request }) => {

      const token=await getToken(request);



   const bookid=await addBook(request,defaultBooking)     

const bookupdate = {

            ...defaultBooking,firstname: 'update',
            
        }


        const req = await request.put(`/booking/${bookid}`,{data:bookupdate,
            headers:{Cookie:`token=${token}`
        
        
            }});

            expect (req.status()).toBe(200);

            const response= await req.json();
            expect (response).toHaveProperty('firstname');

            const newfirstname=response.firstname;
            expect (newfirstname).toBe(bookupdate.firstname);
        
            const objectget= await request.get(`/booking/${bookid}`)
            expect (objectget.status()).toBe(200);
            const objecteresult= await objectget.json();
            expect (objecteresult.firstname).toBe(bookupdate.firstname);
})

})