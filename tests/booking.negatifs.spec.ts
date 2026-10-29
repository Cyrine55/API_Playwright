import { test, expect } from '@playwright/test'
test.describe('PATCH METHOD', () => {

    test('update reservation', async ({ request }) => {
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
 const req = await request.put(`/booking/${bookid}`,{data:bookupdate});

    expect (req.status()).toBe(403);

const reqget=await request.get(`/booking/${bookid}`);
expect (reqget.status()).toBe(200);
const json =await reqget.json();
const firstnameold=json.firstname;
const oldfirstname=booking.firstname;
const newfisrname=bookupdate.firstname;
expect (oldfirstname).not.toBe(newfisrname);



    })







})