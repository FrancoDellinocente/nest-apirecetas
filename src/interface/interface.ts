import { Types } from 'mongoose';

export default interface requestWithUser extends Request {
  user: { userId: Types.ObjectId; username: string };
}
