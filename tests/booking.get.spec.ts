import { test, expect } from '@playwright/test';
import { defaultBooking } from '../utils/booking.data';
import { addBook } from '../utils/booking.helper';

test.describe('GET list booking', () => {

  test('retourne la liste des réservations', async ({ request }) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('get one book', async ({ request }) => {
    const bookid = await addBook(request, defaultBooking);

    const response = await request.get(`/booking/${bookid}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual(defaultBooking);
  });

});
