import { test, expect } from '@playwright/test'

test.describe('PUT test', () => {

    test('update reservation', async ({ request }) => {

        const auth = {
            username: 'admin',
            password: 'password123'
        }
        const authresp = await request.post('/auth', { data: auth });
        expect(authresp.status()).toBe(200);
        const tokenjson = await authresp.json();
        console.log(tokenjson);
        expect(tokenjson).toHaveProperty('token');
        const token = tokenjson.token;
        console.log(token);


        const booking = {

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
        const addbooking = await request.post('/booking', { data: booking });
        const responsebooking= await addbooking.json();
        console.log(responsebooking)
        expect (responsebooking).toHaveProperty('bookingid');
        const bookid =  responsebooking.bookingid;
        
        console.log(bookid);
    

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