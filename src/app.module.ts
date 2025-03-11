import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DnaModule } from './dna/dna.module';
import { DnaService } from './dna/dna.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [DnaModule],
  controllers: [AppController],
  providers: [AppService, DnaService, PrismaService],
})
export class AppModule {}
