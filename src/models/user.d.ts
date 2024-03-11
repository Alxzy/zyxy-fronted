/**
 * 用户实体类型
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    createTime: Date;
    tags:string[];
    planetCode:string;
}