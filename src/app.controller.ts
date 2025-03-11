import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateDnaDto } from './dna/dto/create-dna.dto';
import { Response } from 'express';
import { DnaService } from './dna/dna.service';
import { PrismaService } from './prisma.service';

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

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/mutant')
  async isMutant(@Body() createDnaDto: CreateDnaDto, @Res() res: Response) {
    const isMutant = this.dnaService.isMutant(createDnaDto.dna);

    const dnaFromDb = await this.prisma.dna.findUnique({
      where: {
        dna: createDnaDto.dna.join(''),
      },
    });

    if (!dnaFromDb) {
      await this.prisma.dna.create({
        data: {
          dna: createDnaDto.dna.join(''),
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
