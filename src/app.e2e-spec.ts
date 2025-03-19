import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await prismaService.dna.deleteMany();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('API is running');
  });

  it('/mutant (POST) - should detect mutant DNA', () => {
    const mutantDna = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
    };

    return request(app.getHttpServer())
      .post('/mutant')
      .send(mutantDna)
      .expect(200)
      .expect({
        message: 'sent dna is from a mutant',
      });
  });

  it('/mutant (POST) - should detect human DNA', () => {
    const humanDna = {
      dna: ['TGCATG', 'AGTCCA', 'CAGTGC', 'TTATGT', 'AGATGG', 'TCACTG'],
    };

    return request(app.getHttpServer())
      .post('/mutant')
      .send(humanDna)
      .expect(403)
      .expect({
        message: 'sent dna is from a human',
      });
  });

  it('/mutant (POST) - should return 400 if DNA is invalid', () => {
    const invalidDna = {
      dna: ['esto no es', 'una secuencia', 'de adn', 'valida', 'AG1111ATGG'],
    };

    return request(app.getHttpServer())
      .post('/mutant')
      .send(invalidDna)
      .expect(400);
  });

  it('/mutant (POST) - should return 400 if DNA is an empty array', () => {
    const emptyDna = {
      dna: [],
    };

    return request(app.getHttpServer())
      .post('/mutant')
      .send(emptyDna)
      .expect(400);
  });

  it('/mutant (POST) - should return 400 if DNA is not a square matrix', () => {
    const invalidDna = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA'],
    };

    return request(app.getHttpServer())
      .post('/mutant')
      .send(invalidDna)
      .expect(400);
  });

  it('/stats (GET) - should return DNA statistics', async () => {
    const mutantDna = {
      dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
    };
    const humanDna = {
      dna: ['TGCATG', 'AGTCCA', 'CAGTGC', 'TTATGT', 'AGATGG', 'TCACTG'],
    };

    await request(app.getHttpServer()).post('/mutant').send(mutantDna);
    await request(app.getHttpServer()).post('/mutant').send(humanDna);

    return request(app.getHttpServer()).get('/stats').expect(200).expect({
      count_mutant_dna: 1,
      count_human_dna: 1,
      ratio: 1,
    });
  });
});
