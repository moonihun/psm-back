import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {},
};

/**
 * @author MOON
 * @description Swagger 설정
 */

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('PSM API')
    .setDescription('PSM API 문서')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, swaggerCustomOptions);
}
