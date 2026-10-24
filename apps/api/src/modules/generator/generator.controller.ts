import { Body, Controller, Post, StreamableFile } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateProjectDto } from './dto';
import { Throttle } from '@nestjs/throttler';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Throttle({ default: { limit: 15, ttl: 60 * 60 } })
  @Post('project/generate')
  async generateProject(@Body() dto: GenerateProjectDto): Promise<StreamableFile> {
    const archive = await this.generatorService.generateProject(dto);

    return new StreamableFile(archive, {
      type: 'application/zip',
      disposition: `attachment; filename="${dto.packageJson.projectName}.zip"`,
    });
  }
}
