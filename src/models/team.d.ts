import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    peopleNum: number;
    userPassword?: string,
    // todo 定义枚举值类型，更规范
    status: number;
    createTime: Date;
    updateTime: Date;
    createId?: number;
    createUser?: UserType;
    hasJoinNum?: number;
    hasJoin: boolean;
    createUsername: string;
    createAvatarUrl?: string;
};
