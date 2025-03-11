import { Injectable } from '@nestjs/common';

@Injectable()
export class DnaService {
  isMutant(dna: string[]): boolean {
    const directions = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal
      [1, -1], // diagonal
    ];

    let contador_igualdades = 0;
    const matriz = dna.map((row) => row.split(''));
    const n = matriz.length;

    matriz.forEach((row, f) => {
      row.forEach((_col, c) => {
        const letra_actual = matriz[f][c];

        directions.forEach((direction) => {
          const [direction_x, direction_y] = direction;
          let secuencia_valida = true;

          for (let i = 1; i < 4; i++) {
            const x = f + direction_x * i;
            const y = c + direction_y * i;

            if (
              x < 0 ||
              x >= n ||
              y < 0 ||
              y >= n ||
              matriz[x][y] !== letra_actual
            ) {
              secuencia_valida = false;
              break;
            }
          }

          if (secuencia_valida) {
            contador_igualdades++;
            if (contador_igualdades > 1) {
              return true;
            }
          }
        });
      });
    });

    return contador_igualdades > 1;
  }
}
