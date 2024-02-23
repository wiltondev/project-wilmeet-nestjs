import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { GetMeetDto } from './dtos/getmeet.dto';

@Injectable()
export class MeetService {
  private readonly logger = new Logger(MeetService.name);

  constructor(
    @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
    private readonly userService: UserService,
  ) {}
  async getMeetsByUser(userId: string) {
    this.logger.debug('getMeetsByUser -' + userId);
    return (await this.model.find({ user: userId })) as GetMeetDto[];
  }
}
