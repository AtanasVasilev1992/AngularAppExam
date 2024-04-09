import { User } from "./user";

export interface Museum {
    '_id': string,
    'name': string,
    'image': string
    'description': string
    'workTime': string
    'owner': User,
    'createdAt': string,
    'updatedAt': string,
    '__v': number,
}

