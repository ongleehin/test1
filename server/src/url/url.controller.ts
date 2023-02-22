import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlEntity } from './url.entity';

@Controller('api/url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get()
  findAll() {
    // console.log('@dGet controller');
    return this.urlService.get();
  }

  @Get(':url')
  findOne(@Param('url') url) {
    return this.urlService.findOne(url);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() urlEntity: UrlEntity) {
    return this.urlService.create(urlEntity);
  }

  @Patch(':url')
  async patch(
    @Body() urlEntity: UrlEntity,
    @Param('url') url: string,
  ): Promise<UrlEntity> {
    const result = await this.urlService.patch(url, urlEntity);
    return result;
  }

  @Delete(':url')
  delete(@Param('url') url: string) {
    // console.log('@delete controller');
    this.urlService.delete(url);
  }
}
