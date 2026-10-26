import{test,expect} from '@playwright/test'

test.describe ('repeate post',()=> {

test('repeatposy',async({request})=>{
    const book ={
     firstname :'test',
     lastname:'ccccc',
     totalprice:4543,
     depositpaid:true,
     bookingdates :{
        checkin:"2222-10-22",
        checkout:"4444-11-44"
     },  
     additionalneeds :'fefefe'
        }

const result=await request.post('/booking',{data:book});
expect (result.status()).toBe(200);
const content = await result.json();
expect (content).toHaveProperty('bookingid');
    })


})