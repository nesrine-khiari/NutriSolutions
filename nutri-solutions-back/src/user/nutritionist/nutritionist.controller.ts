import {
  Controller,
  Param,
  Body,
  Get,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './nutritionist.entity';
import { Roles } from 'src/auth/guards/role.guard';
import {
  ExperienceEnum,
  NutritionistStatusEnum,
  UserRoleEnum,
} from 'src/enums/user-enums';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
import { Public } from 'src/auth/guards/auth.guard';

@Controller('nutritionists')
export class NutritionistController {
  constructor(protected readonly nutritionistService: NutritionistService) {}

  /**
   * Récupérer tous les nutritionnistes
   * @param page La page à récupérer
   * @param limit Le nombre de résultats par page
   * @param request La requête pour obtenir le rôle de l'utilisateur
   * @param searchText Texte de recherche pour filtrer les nutritionnistes
   * @param experience Filtrer par expérience
   * @param status Filtrer par statut
   * @returns Une liste de nutritionnistes et le total
   */
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() request: Request, // Inject the request to get the user's role
    @Query('searchText') searchText?: string,
    @Query('experience') experience?: ExperienceEnum,
    @Query('status') status?: NutritionistStatusEnum,
  ): Promise<{
    data: Nutritionist[];
    total: number;
  }> {
    const userRole = request['user'].role;

    return this.nutritionistService.findAllNutritionists(
      page,
      limit,
      searchText,
      experience,
      userRole === UserRoleEnum.CLIENT
        ? NutritionistStatusEnum.APPROVED
        : status,
    );
  }

  /**
   * Compter le nombre total de nutritionnistes
   * @returns Le nombre total de nutritionnistes
   */
  @Public()
  @Get('count')
  async countNutritionists(): Promise<{ total: number }> {
    return this.nutritionistService.countNutritionists();
  }

  /**
   * Récupérer les meilleurs nutritionnistes
   * @returns Une liste des meilleurs nutritionnistes
   */
  @Get('top')
  async getBestNutritionists(): Promise<Nutritionist[]> {
    return this.nutritionistService.getBestNutritionists();
  }

  /**
   * Récupérer un nutritionniste par son ID
   * @param id L'ID du nutritionniste
   * @returns Le nutritionniste correspondant à l'ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Nutritionist> {
    return this.nutritionistService.findOne(id);
  }

  /**
   * Récupérer les patients d'un nutritionniste par son ID
   * @param id L'ID du nutritionniste
   * @returns Une liste des patients du nutritionniste
   */
  @Get(':id/patients')
  async getPatientsByNutritionist(@Param('id') id: string) {
    return this.nutritionistService.getPatientsByNutritionist(id);
  }

  /**
   * Mettre à jour un nutritionniste par son ID
   * @param id L'ID du nutritionniste
   * @param updateNutritionistDto Les données de mise à jour du nutritionniste
   * @returns Le nutritionniste mis à jour
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNutritionistDto: UpdateNutritionistDto,
  ): Promise<Nutritionist> {
    return this.nutritionistService.update(id, updateNutritionistDto);
  }
}
