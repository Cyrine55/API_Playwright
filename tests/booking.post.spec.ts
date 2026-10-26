import { test, expect } from '@playwright/test';
test.describe('méthode POST' ,() => {

test('add book',async({request})=> {
const book={
    firstname :"cyrine",
    lastname  :"yef",
    totalprice :    5,
    depositpaid :true,
    bookingdates:{
        checkin :"2026-05-09",
        checkout:"2026-05-16",},
    additionalneeds :"tesg" }
    


   const res=await request.post('/booking',{data:book});
expect (res.status()).toBe(200);
const body = await res.json();
    console.log(body);
  });



});



