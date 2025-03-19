import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { DnaService } from './dna/dna.service';
import { PrismaService } from './prisma.service';
import { DnaDto } from './dna/dna.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('DNA analysis')
@Controller()
export class AppController {
  constructor(
    private readonly dnaService: DnaService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Check if the API is running' })
  @ApiResponse({ status: 200, description: 'API is running' })
  root(): string {
    return 'API is running';
  }

  @Post('/mutant')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @ApiOperation({ summary: 'Check if the DNA is from a mutant' })
  @ApiBody({
    type: DnaDto,
    description: 'DNA sequence to analyze',
    examples: {
      example1: {
        summary: 'Valid mutant DNA',
        value: {
          dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
        },
      },
      example2: {
        summary: 'Valid human DNA',
        value: {
          dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'DNA is from a mutant' })
  @ApiResponse({ status: 403, description: 'DNA is from a human' })
  @ApiResponse({ status: 400, description: 'DNA is format is invalid' })
  async isMutant(@Body() body: DnaDto, @Res() res: Response) {
    const isSquare = body.dna.every((row) => row.length === body.dna.length);

    if (!isSquare) {
      return res.status(400).json({
        message: 'DNA must be a square matrix',
      });
    }

    const isMutant = this.dnaService.isMutant(body.dna);

    const dnaFromDb = await this.prisma.dna.findUnique({
      where: {
        dna: body.dna.join(''),
      },
    });

    if (!dnaFromDb) {
      await this.prisma.dna.create({
        data: {
          dna: body.dna.join(''),
          isMutant,
        },
      });
    }

    if (isMutant) {
      return res.status(200).json({
        message: 'sent dna is from a mutant',
      });
    }

    return res.status(403).json({
      message: 'sent dna is from a human',
    });
  }

  @Get('/stats')
  @ApiOperation({ summary: 'Get the stats of the DNA analyzed' })
  @ApiResponse({
    status: 200,
    description: 'Stats of the DNA analyzed',
    schema: {
      type: 'object',
      properties: {
        count_mutant_dna: { type: 'number' },
        count_human_dna: { type: 'number' },
        ratio: { type: 'number' },
      },
    },
  })
  async getStats(@Res() res: Response) {
    const mutants = await this.prisma.dna.count({
      where: {
        isMutant: true,
      },
    });

    const humans = await this.prisma.dna.count({
      where: {
        isMutant: false,
      },
    });

    return res.status(200).json({
      count_mutant_dna: mutants,
      count_human_dna: humans,
      ratio: humans > 0 ? mutants / humans : 0,
    });
  }
}
