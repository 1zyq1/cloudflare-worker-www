# Cloudflare Workers 批量域名重定向工具

一个基于 Cloudflare Workers 的轻量级域名重定向解决方案，支持批量配置多个站点的重定向规则。

## 功能特点

- ✅ 批量管理多个站点的重定向规则
- ✅ 支持根域名到 www 子域名的自动重定向
- ✅ 支持自定义路径重定向到指定域名
- ✅ 单文件部署，配置简单
- ✅ 基于 Cloudflare Workers 全球边缘网络，响应速度快

## 快速开始

### 1. 部署到 Cloudflare Workers

1. 登录 Cloudflare 控制台
2. 进入 Workers & Pages 页面
3. 点击 "Create Application"
4. 选择 "Create Worker"
5. 给 Worker 命名后点击 "Deploy"
6. 点击 "Edit code"
7. 将 `worker.js` 文件中的内容复制粘贴到编辑器中
8. 点击 "Save and Deploy"
9. 在 Worker 的 Triggers/路由设置中添加您的域名路由规则

### 2. 配置重定向规则

在 `worker.js` 文件中的 `redirectRules` 数组中配置您的重定向规则：

```javascript
const redirectRules = [
  {
    // 站点配置
    domain: 'example.com',           // 源域名
    wwwRedirect: 'www.example.com',  // 根域名重定向到www子域名
    pathRedirects: [                 // 路径重定向规则
      { path: '/blog', target: 'https://blog.example.com' },
      { path: '/shop', target: 'https://shop.example.com' }
    ]
  }
]
```

## 配置说明

### 基本配置项

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| domain | string | 是 | 源域名 |
| wwwRedirect | string | 否 | 根域名重定向的目标www子域名 |
| pathRedirects | array | 否 | 路径重定向规则数组 |

### 路径重定向配置

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| path | string | 是 | 源路径 |
| target | string | 是 | 重定向目标URL |

## 使用示例

### 示例1：根域名重定向到www子域名

```javascript
{
  domain: 'example.com',
  wwwRedirect: 'www.example.com'
}
```

效果：
- example.com → www.example.com
- example.com/page → www.example.com/page

### 示例2：路径重定向到子域名

```javascript
{
  domain: 'example.com',
  pathRedirects: [
    { path: '/blog', target: 'https://blog.example.com' },
    { path: '/shop', target: 'https://shop.example.com' }
  ]
}
```

效果：
- example.com/blog → blog.example.com
- example.com/shop → shop.example.com

### 示例3：混合配置

```javascript
{
  domain: 'example.com',
  wwwRedirect: 'www.example.com',
  pathRedirects: [
    { path: '/blog', target: 'https://blog.example.com' },
    { path: '/shop', target: 'https://shop.example.com' }
  ]
}
```

效果：
- example.com → www.example.com
- example.com/page → www.example.com/page
- example.com/blog → blog.example.com
- example.com/shop → shop.example.com

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
