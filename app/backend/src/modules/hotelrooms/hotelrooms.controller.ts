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
import { MulterFilesInterceptor } from 'src/interceptors/fileUpload.interceptor';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guard/auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { ID } from '../../infrastructure/global';
import { CreateRoomDto } from './dto/create-room.dto';
import { SearchRoomParamsDto } from './dto/search-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { HotelroomsService } from './hotelrooms.service';
import { HotelRooms } from './schema/hotelrooms.schema';

@Controller('api/rooms')
export class HotelroomsController {
  constructor(private hotelroomsService: HotelroomsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<HotelRooms> {
    const data = { ...createRoomDto };

    if (images?.length) {
      data.images = images.map((img) => img.filename);
    }

    return this.hotelroomsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  updateRoom(
    @Param('id') roomId: ID,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<HotelRooms> {
    return this.hotelroomsService.update(
      roomId,
      updateRoomDto,
      images.map((img) => img.filename),
    );
  }

  @Get()
  searchHotels(
    @Query() searchParams: SearchRoomParamsDto,
  ): Promise<HotelRooms[]> {
    return this.hotelroomsService.search(searchParams);
  }
}
