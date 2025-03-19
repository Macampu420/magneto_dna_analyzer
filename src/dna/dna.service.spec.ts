import { Test, TestingModule } from '@nestjs/testing';
import { DnaService } from './dna.service';

describe('DnaService', () => {
  let service: DnaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DnaService],
    }).compile();

    service = module.get<DnaService>(DnaService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should detect a mutant', () => {
    const dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];

    const result = service.isMutant(dna);

    expect(result).toBe(true);
  });

  it('should detect a human', () => {
    const dna = ['TGCATG', 'AGTCCA', 'CAGTGC', 'TTATGT', 'AGATGG', 'TCACTG'];

    const result = service.isMutant(dna);

    expect(result).toBe(false);
  });
});
