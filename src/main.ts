import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
      .setTitle('Boston API BACKEND')
      .setDescription('Backend для boston')
      .setVersion('2.0.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/documentation', app, document)

    app.enableCors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    })
    app.use(cookieParser())

    await app.listen(PORT, () => console.log(`>> Server started on ${PORT} port`))
  } catch (e) {
    console.log(e)
  }
}
bootstrap()
