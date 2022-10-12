import { IsString, Length, Matches } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @Length(4)
  title: string;

  @IsString()
  description: string;

  @IsString()
  @Matches(/^((\w+,)*\w+)$/, {
    message: 'Tags must be a comma separated list of words',
  })
  tags: string;
}
