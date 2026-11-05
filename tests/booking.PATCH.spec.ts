import { test, expect } from '@playwright/test'
import { addBook, getToken } from '../utils/booking.helper';
import { defaultBooking } from '../utils/booking.data';


test.describe('PATCH METHOD', () => {


    test('patch', async ({ request }) => {

    const token=await getToken(request);



        const bookid=await addBook(request,defaultBooking)
        

        const newfirstname = {
            firstname: "newnew"

        }

        const patchreq = await request.patch(`/booking/${bookid}`,
            {
                data: newfirstname,
                headers: { Cookie: `token=${token}` }
            }

        );
        expect(patchreq.status()).toBe(200)
        const patchresp = await patchreq.json();
        const newfirstnamejson = patchresp.firstname;
        expect(newfirstnamejson).toEqual(newfirstname.firstname);

        const newlastnamejsob = patchresp.lastname;
        expect(newlastnamejsob).toEqual(defaultBooking.lastname);

        const newdepositpaid = patchresp.depositpaid;
        expect (newdepositpaid).toEqual(defaultBooking.depositpaid);

    })


})