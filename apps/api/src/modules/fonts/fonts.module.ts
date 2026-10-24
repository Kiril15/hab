import { Module } from "@nestjs/common";
import { FontsRegistry } from "./fonts.registry";
import { IsAvailableFontConstraint } from "./validators";

@Module({
	providers: [FontsRegistry, IsAvailableFontConstraint],
	exports: [FontsRegistry, IsAvailableFontConstraint],
})
export class FontsModule {}
