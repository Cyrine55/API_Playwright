import { test, expect, request } from '@playwright/test';

test.describe('GET list booking', () => {

  test('retourne la liste des réservations', async ({ request }) => {
     const response = await request.get('/booking');
     expect(response.status()).toBe(200);
     const body = await response.json();
     expect(body.length).toBeGreaterThan(0);
     console.log(body);
  });


  test('get one book',async({ request })=>{
  const response = await request.get('/booking');
  const body= await response.json();
  const bookid= await body[1].bookingid;
  console.log(bookid);
const responsebookid= await request.get(`/booking/${bookid}`);
expect(responsebookid.status()).toBe(200);

}
);

});


