import { ArrayNotEmpty, IsArray, IsString, Matches } from 'class-validator';

export class DnaDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[ATCG]+$/, { each: true })
  dna: string[];
}
