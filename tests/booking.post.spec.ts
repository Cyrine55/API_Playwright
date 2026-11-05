import { test, expect } from '@playwright/test';
import { defaultBooking } from '../utils/booking.data';

test.describe('méthode POST', () => {

  test('add book', async ({ request }) => {
    const res = await request.post('/booking', { data: defaultBooking });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking).toEqual(defaultBooking);
  });

});
