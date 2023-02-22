import {
  BadRequestException,
  Injectable,
  NotFoundException,
  // BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';
import { UrlEntity } from './url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity) private urlRepository: Repository<UrlEntity>,
  ) {}
  async get(): Promise<UrlEntity[]> {
    return this.urlRepository.find({
      select: ['url', 'shortUrl'],
    });
  }

  findOne(url: string): Promise<UrlEntity> {
    return this.urlRepository.findOne({
      select: ['url', 'shortUrl'],
      where: { url },
    });
  }

  async create(newUrlEntity: UrlEntity) {
    const existingUrlEntity = await this.urlRepository.findOne({
      where: { url: newUrlEntity.url },
    });
    if (existingUrlEntity) {
      // throw new BadRequestException(
      //   `Url ${newUrlEntity.url} already have a short Url ${existingUrlEntity.shortUrl}`,
      // );
      return existingUrlEntity;
    } else {
      // newUrlEntity.shortUrl = generateShortUrl(7);
      // newUrlEntity.shortUrl = 'asdf';
      //return await this.urlRepository.save(newUrlEntity);
      let result: UrlEntity;
      let tries = 0;
      while (tries < 1000) {
        tries++;
        let dupError = false;
        try {
          newUrlEntity.shortUrl = generateShortUrl(7);
          result = await this.urlRepository.save(newUrlEntity);
        } catch (error) {
          if (
            !(error instanceof QueryFailedError) ||
            !error.message.includes('Duplicate entry')
          ) {
            throw error;
          }
          dupError = true;
          console.log(
            'error: duplication of shortUrl, need to regenerate a new one',
            newUrlEntity.shortUrl,
          );
        }
        if (!dupError) {
          break;
        }
      }
      if (tries >= 1000) {
        throw new BadRequestException(
          `Cannot find a unused short url after ${tries} attempts`,
        );
      }
      return result;
    }
  }

  async delete(url: string): Promise<any> {
    return this.urlRepository.delete(url);
  }

  async patch(url: string, newEntity: UrlEntity): Promise<UrlEntity> {
    const existingUrlEntity = await this.urlRepository.findOne({
      where: { url: url },
    });
    if (!existingUrlEntity) {
      throw new NotFoundException('Url is not found');
    }
    existingUrlEntity.url = newEntity.url;
    existingUrlEntity.shortUrl = newEntity.shortUrl;
    await existingUrlEntity.save();
    return existingUrlEntity;
  }
}

function generateShortUrl(len: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  // const charset = 'abcde';
  const charsetLength = charset.length;

  let shortUrl = '';
  for (let i = 0; i < len; i++) {
    shortUrl += charset.charAt(Math.floor(Math.random() * charsetLength));
  }

  const domainName = 'sho.rt/';
  const fullShortUrl = domainName + shortUrl;

  return fullShortUrl;
}
