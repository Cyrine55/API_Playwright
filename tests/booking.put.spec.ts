import { test, expect } from '@playwright/test';
import { getToken,addBook ,deletebook} from '../utils/booking.helper';
import { defaultBooking } from '../utils/booking.data';



test.describe('PUT test', () => {
    let token:string;
    let bookid:number
test.beforeEach(async({request})=>{
token=await getToken(request);
bookid=await addBook(request, defaultBooking);
})
test.afterEach(async({request})=>{
await deletebook(request, bookid, token);
    })


    test('update reservation', async ({ request }) => {  

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