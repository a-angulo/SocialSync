import mongoose, { Schema, model, type Document, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address']
    },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model<IUser>('User', userSchema);
export default User;

