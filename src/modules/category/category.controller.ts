import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import AccessTokenGuard from '../auth/guards/access-token.guard';
import { AddCategoryDto } from './dtos/category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/:id')
  async getCategory(@Param('id') id: number) {
    return this.categoryService.getCategory(id);
  }

  @ApiBearerAuth('Access-Token')
  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  async getAllCategory() {
    return this.categoryService.getAllCategories();
  }

  @ApiBearerAuth('Access-Token')
  @UseGuards(AccessTokenGuard)
  @Post()
  async addCategory(@Body() dto: AddCategoryDto) {
    return this.categoryService.createCategory(dto);
  }
}
