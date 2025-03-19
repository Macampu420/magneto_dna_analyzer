import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString, Matches } from 'class-validator';

export class DnaDto {
  @ApiProperty({
    description:
      'DNA sequence to analyze. Each string must match the regex pattern /^[ATCG]+$/',
    example: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[ATCG]+$/, { each: true })
  dna: string[];
}
