import { BaseRESTService } from './BaseRESTService'
import { SiteThemeModel, UserThemeModel } from '../db'
import { Optional } from 'sequelize'

interface FindRequest {
  userId: number
}

export class UserhemeService implements BaseRESTService {
  public find = async ({ userId }: FindRequest) => {
    return await UserThemeModel.findAll({
      attributes: ['id'],
      where: {
        owner_id: userId,
      },
      include: [
        {
          model: SiteThemeModel,
          attributes: ['theme', 'description'],
        },
      ],
    }).then(users => JSON.parse(JSON.stringify(users))[0])
  }

  public set = async ({ userId, themeId }: Optional<any, string>) => {
    if (userId === undefined) {
      return false
    }

    const user = await UserThemeModel.findOne({
      where: { owner_id: userId },
    })

    if (!user) {
      return UserThemeModel.create({
        theme_id: themeId,
        owner_id: userId,
      })
    }

    return UserThemeModel.update(
      {
        theme_id: themeId,
      },
      {
        where: { owner_id: userId },
      }
    )
  }
}

export const userThemeService = new UserhemeService()
