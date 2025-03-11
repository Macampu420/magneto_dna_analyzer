import { Module } from '@nestjs/common';
import { DnaService } from './dna.service';

@Module({
  providers: [DnaService],
})
export class DnaModule {}
