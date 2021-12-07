import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSchema } from "~/modules/based/base.schema";
import { Status } from "~/modules/enum/status.enum";

export const UserModelName = 'User';

@Schema({timestamps: true})
export class User extends BaseSchema {
    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true, unique: true})
    name!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true, unique: true})
    email!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true,})
    password!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true,})
    address!: string;

    @ApiProperty()
    @Prop({type: 'string', required: true, trim: true,})
    phone!: number;

    @ApiProperty()
    @Prop({type: 'string', required: true, enum: Status, default: Status.ACTIVE })
    status?: string = Status.ACTIVE;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);


export class GetUserQuery {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;
}

export class Login {
    @ApiProperty()
    email!: string;

    @ApiProperty()
    password!: string;
}
