import { test, expect } from '@playwright/test'

test.describe('PATCH METHOD', () => {

    const auth = {
        username: 'admin',
        password: 'password123'
    }

    test('patch', async ({ request }) => {

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

        const newfirstname = {
            firstname: "newnew"

        }

        const putreq = await request.patch(`/booking/${bookid}`,
            {
                data: newfirstname,
                headers: { Cookie: `token=${token}` }
            }

        );
        expect(putreq.status()).toBe(200)
        const patchresp = await putreq.json();
        const newfirstnamejson = patchresp.firstname;
        expect(newfirstnamejson).toEqual(newfirstname.firstname);

        const newlastnamejsob = patchresp.lastname;
        expect(newlastnamejsob).toEqual(book.lastname);

        const newdepositpaid = patchresp.depositpaid;
        expect (newdepositpaid).toEqual(book.depositpaid);

    })


})