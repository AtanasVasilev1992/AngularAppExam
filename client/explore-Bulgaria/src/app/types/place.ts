import { User } from "./user"

export interface Place {
 '_id': string,
    'name': string,
    'city': string,
    'img': string
    'description': string
    'workTime': string
    'owner': User,
    'createdAt': string,
    'updatedAt': string,
    '__v': number,
}
