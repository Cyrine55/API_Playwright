import { expect, APIRequestContext } from '@playwright/test'
export async function getToken(request: APIRequestContext) {

    const auth = {
        username: 'admin',
        password: 'password123'
    }
    const tokenreq = await request.post('/auth', { data: auth })
    expect(tokenreq.status()).toBe(200);

    const tokenjson = await tokenreq.json();
    expect(tokenjson).toHaveProperty('token');
    const token = tokenjson.token;
    return (token);
}


export async function addBook(request:APIRequestContext,booking:Object){
const bookreq= await request.post('/booking',{data:booking});

expect (bookreq.status()).toBe(200);
const book=await bookreq.json();

        expect (book).toHaveProperty('bookingid');
        const bookid =  book.bookingid;
        return bookid

}

