import { IsNumber, IsOptional } from 'class-validator';

export class GetUserRecommendDto {
  @IsOptional()
  @IsNumber()
  userID?: number;
}
