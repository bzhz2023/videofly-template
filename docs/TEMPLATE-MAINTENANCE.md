# 模板维护说明

这个 fork 用来维护 VideoFly 模板的可复用基线。

## 仓库关系

- `origin`: 自己账号下的 fork，用来保存可复用改动。
- `upstream`: 原模板仓库 `zifeixu85/videofly-template`，用来同步模板更新。

## 推荐分支

- `main`: 尽量保持和 `upstream/main` 同步。
- `codex/performance-baseline`: 模板通用性能优化基线。

后续新项目建议从 `codex/performance-baseline` clone 或创建业务分支。

## 同步原模板更新

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main

git switch codex/performance-baseline
git rebase main
pnpm typecheck
BETTER_AUTH_SECRET=dummy-secret NEXT_PUBLIC_APP_URL=http://localhost:3000 GOOGLE_CLIENT_ID=dummy GOOGLE_CLIENT_SECRET=dummy RESEND_API_KEY=dummy RESEND_FROM=support@example.com pnpm build
git push --force-with-lease origin codex/performance-baseline
```

## 性能基线原则

- 生成页首屏只加载必要表单和布局，历史面板、落地页、弹窗等重组件延迟加载。
- 有生成中视频时，不要定时刷新整个列表；只轮询状态接口，发现终态后再刷新列表。
- 卡片菜单、删除弹窗、下载 toast 等交互组件只在用户打开菜单后加载。
- 首屏以下的营销区块优先延迟加载。
- 新增导航页面时，补到 idle route prefetch 列表中。

## 后续专项

- 多语言硬编码：系统性检查页面标题、按钮文案、toast、错误消息、空状态、加载态，统一迁移到 `src/messages/*.json`。
- 模板首页：继续拆分 Hero/Pricing 中的重依赖，目标是把首页 First Load JS 再压低。
- 构建 warning：评估 `undici` optional dependency warning 是否需要在模板中显式处理。
