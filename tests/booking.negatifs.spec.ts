import { test, expect, request } from '@playwright/test'
import { defaultBooking } from '../utils/booking.data';
import { addBook , deletebook,getToken} from '../utils/booking.helper';




test.describe('Tests négatifs', () => {
    let bookid:number
    test.beforeEach(async({request})=>{
        bookid=await addBook(request, defaultBooking);
    })
    test.afterEach(async ({ request }) => {
        const token = await getToken(request);
        await deletebook(request, bookid, token);
    })
    test('PUT sans token → 403 et booking inchangé', async ({ request }) => {

       

        const bookupdate = {
            ...defaultBooking,
            firstname: 'firstfirst'
        }
        const req = await request.put(`/booking/${bookid}`, { data: bookupdate });
        expect(req.status()).toBe(403);

        const reqget = await request.get(`/booking/${bookid}`);
        expect(reqget.status()).toBe(200);
        const json = await reqget.json();
        expect(json.firstname).toBe(defaultBooking.firstname);
    })

test('Patch renvoie 403',async({request})=>{

 const newfirstname = {
            firstname: "newnew"

        }
        const reqpatch=await request.patch(`/booking/${bookid}`,
            {data:newfirstname}
        )
        expect (reqpatch.status()).toBe(403);

        const reqget=await request.get(`/booking/${bookid}`);
          expect (reqget.status()).toBe(200);
        const json = await reqget.json()
        expect(json.firstname).toBe(defaultBooking.firstname);

})


test('put token invalide',async({request})=> {
   
    const updateobject={
        ...defaultBooking,
        firstname:'hhhh'
    };
    const requpdate=await request.put(`/booking/${bookid}`,{data:updateobject,
        headers:{cookie:'token=tokeninvalide' }}
    );
    expect(requpdate.status()).toBe(403);
    const reqget = await request.get(`/booking/${bookid}`);
    expect(reqget.status()).toBe(200);
    expect(await reqget.json()).toEqual(defaultBooking);
})


})

