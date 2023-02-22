import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import expect from 'expect';
import { UrlEntity } from './../src/url/url.entity';

describe('AppController (end to end testing)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  let allUrls: UrlEntity[];
  const newUrl = '1112';

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/url')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    allUrls = response.body;
    response.body.forEach((obj) => {
      expect(obj).toMatchObject({
        url: expect.any(String),
        shortUrl: expect.stringMatching(/^sho\.rt\/[a-z0-9]{7}$/),
      });
    });
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/url')
      .send({ url: newUrl })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body).toMatchObject({
      url: newUrl,
      shortUrl: expect.stringMatching(/^sho\.rt\/[a-z0-9]{7}$/),
    });
  });

  // it('/ (DELETE)', async () => {
  //   const response = await request(app.getHttpServer())
  //     .delete(`/url/${allUrls[0].url}`)
  //     .expect(200);
  //   // .expect('Content-Type', 'application/json; charset=utf-8');
  //   //   expect(response).toMatchObject(validObject(url));
  // });

  afterAll((done) => {
    app.close();
    done();
  });
});
