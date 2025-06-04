import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { MulterFilesInterceptor } from 'src/interceptors/fileUpload.interceptor';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guard/roles.guard';
import { ID } from '../../infrastructure/global';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { SearchParamsDto } from './dto/search-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelsService } from './hotels.service';
import { Hotels } from './schema/hotels.schema';

@Controller('api/hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  createHotel(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<Hotels> {
    const data = { ...createHotelDto };

    if (images?.length) {
      data.images = images.map((img) => img.filename);
    }

    return this.hotelsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  updateHotel(
    @Param('id') hotelId: ID,
    @Body() updateHotelDto: UpdateHotelDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Hotels> {
    return this.hotelsService.update(
      hotelId,
      updateHotelDto,
      images.map((img) => img.filename),
    );
  }

  @Get()
  searchHotels(@Query() searchParams: SearchParamsDto): Promise<Hotels[]> {
    return this.hotelsService.search(searchParams);
  }

  @Get('/findhotel/:id')
  findById(@Param('id') hotelId: ID): Promise<Hotels> {
    return this.hotelsService.findById(hotelId);
  }
}
