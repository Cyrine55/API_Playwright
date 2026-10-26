import { test, expect } from '@playwright/test'
test.describe('PATCH METHOD', () => {
 const auth = {
        username: 'admin',
        password: 'password123'
    }

test('DELETE BOOK ', async ({ request }) => {

        const authreq = await request.post('/auth', { data: auth });
        expect(authreq.status()).toBe(200);
        const reqtoken = await authreq.json();
        console.log(reqtoken);
        expect(reqtoken).toHaveProperty('token');
        const token = reqtoken.token;


        const book = {
            firstname: 'tedst',
            lastname: 'ccdccc',
            totalprice: 45643,
            depositpaid: true,
            bookingdates: {
                checkin: "2222-10-22",
                checkout: "4444-11-12"
            },
            additionalneeds: 'ffeefefe'

        }
        const addbook = await request.post('/booking', { data: book });
        const addbookresponse = await addbook.json();
         expect(addbook.status()).toBe(200);
        console.log(addbookresponse);
        expect(addbookresponse).toHaveProperty('bookingid')
        const bookid = addbookresponse.bookingid

const deletereq =await request.delete(`/booking/${bookid}`,
   { headers:{Cookie:`token=${token}`
}
   }
);
expect (deletereq.status()).toBe(200);

const getdeletedbook= await request.get(`/booking/${bookid}`);
expect (getdeletedbook.status()).toBe(404);


})

    })