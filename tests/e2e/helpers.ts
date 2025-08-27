import type { Page } from '@playwright/test'
import { uuid } from 'zeed'

export function makeUrl(name: string, dark: boolean = false) {
  const url = `/?dark=${dark ? '1' : '0'}&_=${uuid()}#${name}`
  // console.log('URL:', url)
  return url
}

export async function setPageAndWait(page: Page, name: string, dark = false) {
  await page.goto('/')
  await page.waitForSelector('.oui-demo-loaded', { timeout: 3000 })

  const data = { name, dark }
  await page.evaluate((data: any) => {
    (window as any).setPage(data.name, data.dark)
  }, data)

  await page.waitForSelector('.oui-demo', { timeout: 3000 })
}
