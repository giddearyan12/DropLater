import request from 'supertest'
import nock from 'nock'
import app from '../index.js' 

test("worker calls /sink for past releaseAt", async () => {
 
  const sink = nock("http://localhost:8000")
    .post("/sink")
    .reply(200, { ok: true });


  await request(app)
    .post("/notes")
    .send({ name: "hello", desc: "test", releaseAt: "2000-01-01T00:00:00Z" })
    .expect(201);

 
  expect(sink.isDone()).toBe(true);
});
