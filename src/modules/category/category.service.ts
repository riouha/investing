import { Injectable, NotFoundException } from '@nestjs/common';
import { AddCategoryDto } from './dtos/category.dto';
import { In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>) {}

  async createCategory(dto: AddCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async getCategory(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('category not found');
    return category;
  }

  async searchCategories(ids: number[]) {
    return this.categoryRepo.find({ where: { id: In(ids) } });
  }

  async getAllCategories() {
    return this.categoryRepo.find();
  }

  async deleteCategory(id: number) {
    return this.categoryRepo.delete(id);
  }
}
