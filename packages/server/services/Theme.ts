import { BaseRESTService } from './BaseRESTService'
import { SiteThemeModel } from '../db'
import { Optional } from 'sequelize'

interface FindRequest {
  id?: number
  title?: string
}

export class ThemeService implements BaseRESTService {
  public find = ({ id, title }: FindRequest) => {
    if (id) {
      return SiteThemeModel.findByPk(id)
    }

    return SiteThemeModel.findOne({
      where: {
        theme: `%${title}%`,
      },
    })
  }

  public create = async (data: Optional<any, string>) => {
    const { theme } = data

    const thisTheme = await SiteThemeModel.findOne({
      where: { theme },
    })

    if (thisTheme) {
      return SiteThemeModel.update(
        {
          ...data,
        },
        {
          where: { theme },
        }
      )
    }
    return SiteThemeModel.create(data)
  }
}

export const themeService = new ThemeService()
