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

@Controller()
export class AppController {
  constructor(
    private readonly dnaService: DnaService,
    private prisma: PrismaService,
  ) {}

  @Get()
  root(): string {
    return 'API is running';
  }

  @Post('/mutant')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
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
      ratio: mutants / humans,
    });
  }
}
