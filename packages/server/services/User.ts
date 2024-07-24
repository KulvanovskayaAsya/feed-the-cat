import { BaseRESTService } from './BaseRESTService'
import { UserModel } from '../sequelize'
import { Optional } from 'sequelize'

export class UserService implements BaseRESTService {
  public create = async (data: Optional<any, string>) => {
    const { login } = data

    const thisUser = await UserModel.findOne({
      where: {
        login,
      },
    })
    if (thisUser) {
      return UserModel.update(
        {
          ...data,
        },
        {
          where: { id: thisUser.id },
        }
      )
    }

    return UserModel.create({
      ...data,
    })
  }
}

export const userService = new UserService()
