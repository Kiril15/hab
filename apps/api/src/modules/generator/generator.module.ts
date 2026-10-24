import { Module } from "@nestjs/common";
import { FontsModule } from "../fonts/fonts.module";
import { TemplatesModule } from "../templates/templates.module";
import { GeneratorController } from "./generator.controller";
import { GeneratorService } from "./generator.service";
import { I18nMessagesBuilder } from "./options";
import { LayoutBuilder, PagesBuilder, TemplateFilesBuilder } from "./project/builders";
import { PackageJsonTransformer } from "./project/transformers";

@Module({
	imports: [TemplatesModule, FontsModule],
	controllers: [GeneratorController],
	providers: [
		GeneratorService,
		TemplateFilesBuilder,
		LayoutBuilder,
		PagesBuilder,
		I18nMessagesBuilder,
		PackageJsonTransformer,
	],
})
export class GeneratorModule {}
