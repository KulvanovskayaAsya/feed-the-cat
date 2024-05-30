import type { FC } from 'react'
import './Page404.css'
import { Page } from '../Page'
import smallCat from '../../assets/smallCat.png'
import { Button, Card, Flex } from 'antd'

export const Page404: FC = () => {
  return (
    <Page>
      <Flex align="center" justify="center" vertical>
        <header className="header">
          <h1 className="h1">
            FEED THE <img className="image" src={smallCat} alt="cat" /> CAT
          </h1>
        </header>

        <main>
          <Flex className="wrapper" align="center" justify="center" vertical>
            <Card className="card">
              <div className="border-top"></div>
              <div className="border-right"></div>
              <div className="border-bottom"></div>
              <div className="border-left"></div>

              <Flex align="center" justify="flex-start" vertical>
                <h2 className="h2">OOPS</h2>
                <p className="text">Sorry, the page not found</p>
              </Flex>
            </Card>

            <Button className="button">
              <div className="border-top"></div>
              <div className="border-right"></div>
              <div className="border-bottom"></div>
              <div className="border-left"></div>
              MAIN MENU
            </Button>
          </Flex>
        </main>
      </Flex>
    </Page>
  )
}
