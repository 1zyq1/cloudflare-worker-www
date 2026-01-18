
// Cloudflare Workers 批量重定向脚本
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 批量配置站点重定向规则
const redirectRules = [
  {
    // 站点1配置
    domain: '1zyq1.com',
    wwwRedirect: 'www.1zyq1.com', // 根域名重定向到www子域名
    pathRedirects: [
      { path: '/hayfrp', target: 'https://hayfrp.1zyq1.com' },
      { path: '/github', target: 'https://github.1zyq1.com' }
    ]
  },
  // 添加更多站点配置，例如：
  // {
  //   domain: 'example.com',
  //   wwwRedirect: 'www.example.com',
  //   pathRedirects: [
  //     { path: '/blog', target: 'https://blog.example.com' },
  //     { path: '/shop', target: 'https://shop.example.com' }
  //   ]
  // }
]

async function handleRequest(request) {
  const url = new URL(request.url)
  const hostname = url.hostname
  const pathname = url.pathname

  // 查找匹配的站点配置
  const siteConfig = redirectRules.find(rule => rule.domain === hostname)

  if (siteConfig) {
    // 检查路径重定向规则
    const pathRule = siteConfig.pathRedirects.find(rule => rule.path === pathname)
    if (pathRule) {
      return Response.redirect(pathRule.target, 301)
    }

    // 如果配置了www重定向，则重定向到www子域名(不保留原始路径)
    if (siteConfig.wwwRedirect) {
      return Response.redirect(`https://${siteConfig.wwwRedirect}`, 301)
    }
  }

  // 其他情况返回 404
  return new Response('Not Found', { status: 404 })
}
