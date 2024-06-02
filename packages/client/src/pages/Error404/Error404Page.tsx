import type { FC } from 'react'
import { Flex } from 'antd'
import './Error404Page.css'
import { Page } from '../Page'
import { PixelButton, PixelCard, PixelHeader } from '../../components'
import smallCat from '../../assets/smallCat.png'

export const Error404Page: FC = () => {
  return (
    <Page>
      <Flex align="center" justify="center" vertical>
        <header className="error404-page-header">
          <PixelHeader>
            FEED THE{' '}
            <img className="error404-page-img" src={smallCat} alt="cat" /> CAT
          </PixelHeader>
        </header>

        <main>
          <Flex align="center" justify="center" vertical>
            <PixelCard className="error404-page-card">
              <Flex align="center" justify="flex-start" vertical>
                <h2 className="error404-page-h2">OOPS</h2>
                <p className="error404-page-text">Sorry, the page not found</p>
              </Flex>
            </PixelCard>

            <PixelButton>MAIN MENU</PixelButton>
          </Flex>
        </main>
      </Flex>
    </Page>
  )
}
