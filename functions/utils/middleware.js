/**
 * 清洁版 Middleware
 * 移除了所有第三方监控 (Sentry) 和数据上报 (Telemetry) 逻辑
 * 仅保留结构兼容性，确保主程序正常运行
 */

// 错误处理中间件：不再上报错误，仅作为透明转发
export async function errorHandling(context) {
  // 如果你需要本地调试，可以在这里打印 context.env
  // 但严禁将数据发送至任何外部 URL
  return context.next();
}

// 数据统计中间件：移除所有 Headers 和 CF 信息的抓取
export function telemetryData(context) {
  // 直接进入下一步，不进行任何数据记录
  return context.next();
}

// 追踪数据中间件：空实现，防止主程序调用报错
export async function traceData(context, span, op, name) {
  // 仅作为占位符，不执行任何逻辑
  return;
}

/**
 * 额外的安全建议：
 * 1. 建议在 Cloudflare Pages 的环境变量中删除所有关于 Sentry 的 DSN。
 * 2. 建议删除 package.json 中关于 "@cloudflare/pages-plugin-sentry" 的依赖。
 */
