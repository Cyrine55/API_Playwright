import { test, expect } from '@playwright/test'

test.describe('put book', () => {

    test('update', async ({ request }) => {

        const cnx = {
            username: 'admin',
            password: 'password123'
        }
        const authresponse = await request.post('/auth', { data: cnx })
        expect(authresponse.status()).toBe(200);

        const tokenjson = await authresponse.json();
        console.log(tokenjson);
        expect(tokenjson).toHaveProperty('token');
        const token = tokenjson.token;


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
        const responsebooking = await addbooking.json();
        console.log(responsebooking)
        expect(responsebooking).toHaveProperty('bookingid');
        const bookid = responsebooking.bookingid;

        console.log(bookid);



        const newbook = {
            firstname: 'new',
            lastname: 'new',
            totalprice: 45643,
            depositpaid: true,
            bookingdates: {
                checkin: "2222-10-22",
                checkout: "4444-11-12"
            },
            additionalneeds: 'ffeefefe'
        }

        const requpdate = await request.put(`/booking/${bookid}`,
            {
                data: newbook,
                headers: {
                    Cookie: `token=${token}`
                }

            });
        const requpdat = await requpdate.json();
        expect(requpdat).toHaveProperty('firstname');
        const newfirstname = requpdat.firstname;
        expect(newfirstname).toEqual(newbook.firstname);
        expect(requpdat.status()).toBe(200);




    })
































})