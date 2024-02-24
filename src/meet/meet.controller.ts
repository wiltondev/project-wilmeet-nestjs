import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { MeetService } from './meet.service';
import { CreateMeetDto } from './dtos/createmeet.dtos';
import { GetMeetDto } from './dtos/getmeet.dto';

@Controller('meet')
export class MeetController {
  constructor(private readonly service: MeetService) {}
  @Get()
  async getUsers(@Request() req) {
    const { userId } = req?.user;

    const result = await this.service.getMeetsByUser(userId);

    // eslint-disable-next-line prettier/prettier
    return result.map( m => ({
          id: m._id.toString(),
          name: m.name,
          color: m.color,
          link: m.link,
        }) as GetMeetDto,
    );
  }

  @Post()
  async createMeet(@Request() req, @Body() dto: CreateMeetDto) {
    const { userId } = req?.user;
    await this.service.createMeet(userId, dto);
  }

  @Delete(':id')
  async deleteMeet(@Request() req, @Param() params) {
    const { userId } = req?.user;
    const { id } = params;
    await this.service.deleteMeetByUser(userId, id);
  }
}
