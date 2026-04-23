// ============================================================
//  Clash Verge 一体化扩展脚本 —— UI 可选策略版
// ============================================================

// ────────────────────────────────────────────────────────────
//  § 1  地区节点分组
// ────────────────────────────────────────────────────────────
const REGION_CONFIG = [
  {
    name: "🇭🇰 香港",
    filter: /香港|HK|HongKong|Hong\s*Kong|🇭🇰/i,
    type: "url-test",
    url: "http://www.gstatic.com/generate_204",
    interval: 300, tolerance: 50,
  },
  {
    name: "🇯🇵 日本",
    filter: /日本|JP|Japan|东京|大阪|Tokyo|Osaka|🇯🇵/i,
    type: "url-test",
    url: "http://www.gstatic.com/generate_204",
    interval: 300, tolerance: 50,
  },
  {
    name: "🇸🇬 新加坡",
    filter: /新加坡|SG|Singapore|狮城|🇸🇬/i,
    type: "url-test",
    url: "http://www.gstatic.com/generate_204",
    interval: 300, tolerance: 50,
  },
  {
    name: "🇺🇸 美国",
    filter: /美国|US|USA|United\s*States|America|洛杉矶|纽约|硅谷|Los\s*Angeles|New\s*York|🇺🇸/i,
    type: "url-test",
    url: "http://www.gstatic.com/generate_204",
    interval: 300, tolerance: 50,
  },
];

const SELECTOR_NAME = "🚀 节点选择";
const AUTO_NAME     = "⚡ 自动选择";
const FALLBACK_NAME = "🔯 故障转移";

// ────────────────────────────────────────────────────────────
//  § 2  固定 Rule Providers（走 DIRECT / REJECT，无需 UI 选择）
// ────────────────────────────────────────────────────────────
const FIXED_PROVIDERS = {
  reject: {
    type: "http", behavior: "domain", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    path: "./ruleset/reject.yaml",
  },
  icloud: {
    type: "http", behavior: "domain", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    path: "./ruleset/icloud.yaml",
  },
  apple: {
    type: "http", behavior: "domain", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    path: "./ruleset/apple.yaml",
  },
  steamCN: {
    type: "http", behavior: "domain", interval: 86400,
    url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/steam%40cn.yaml",
    path: "./ruleset/steamCN.yaml",
  },
  direct: {
    type: "http", behavior: "domain", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    path: "./ruleset/direct.yaml",
  },
  private: {
    type: "http", behavior: "domain", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    path: "./ruleset/private.yaml",
  },
  lancidr: {
    type: "http", behavior: "ipcidr", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    path: "./ruleset/lancidr.yaml",
  },
  cncidr: {
    type: "http", behavior: "ipcidr", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    path: "./ruleset/cncidr.yaml",
  },
  applications: {
    type: "http", behavior: "classical", interval: 86400,
    url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    path: "./ruleset/applications.yaml",
  },
};

// ────────────────────────────────────────────────────────────
//  § 3  策略 Rule Providers（每条自动生成一个 UI 可选的代理组）
//
//  字段说明：
//    key       - rule-provider 的 key，同时也用于 RULE-SET 引用
//    groupName - 在 Clash UI 中显示的代理组名称
//    default   - 代理组选项列表里排在第一位的默认项
//    provider  - rule-provider 的配置
//
//  ✏️ 新增一条策略：复制任意一块，改 key / groupName / url / path 即可
// ────────────────────────────────────────────────────────────
const POLICY_RULES = [
  {
    key: "ai",
    groupName: "🤖 AI",
    default: "🇸🇬 新加坡",   // 默认走新加坡，可在 UI 里随时改
    provider: {
      type: "http", behavior: "domain", interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/category-ai-!cn.yaml",
      path: "./ruleset/ai.yaml",
    },
  },
  {
    key: "steam",
    groupName: "🎮 Steam",
    default: SELECTOR_NAME,
    provider: {
      type: "http", behavior: "domain", interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/steam.yaml",
      path: "./ruleset/steam.yaml",
    },
  },
  {
    key: "google",
    groupName: "🌐 Google",
    default: SELECTOR_NAME,
    provider: {
      type: "http", behavior: "domain", interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
      path: "./ruleset/google.yaml",
    },
  },
  {
    key: "proxy",
    groupName: "🔀 代理域名",
    default: SELECTOR_NAME,
    provider: {
      type: "http", behavior: "domain", interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      path: "./ruleset/proxy.yaml",
    },
  },
  {
    key: "telegramcidr",
    groupName: "✈️ Telegram",
    default: SELECTOR_NAME,
    provider: {
      type: "http", behavior: "ipcidr", interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      path: "./ruleset/telegramcidr.yaml",
    },
  },
  // ── 新增策略示例（取消注释并填写）──────────────────────────
  {
    key: "nikkeExpend",
    groupName: "🪻 NikkeExpend",
    default: "🇭🇰 香港",
    provider: {
      type: "http", behavior: "domain", interval: 86400,
      url: "https://raw.githubusercontent.com/abqKonKon/autorule/refs/heads/main/nikkeExpend.yaml",
      path: "./ruleset/nikkeExpend.yaml",
    },
  },

  // ── 新增策略示例（取消注释并填写）──────────────────────────
  // {
  //   key: "youtube",
  //   groupName: "▶️ YouTube",
  //   default: "🇭🇰 香港",
  //   provider: {
  //     type: "http", behavior: "domain", interval: 86400,
  //     url: "https://...",
  //     path: "./ruleset/youtube.yaml",
  //   },
  // },
];

// ────────────────────────────────────────────────────────────
//  § 4  规则顺序
//       固定规则直接写目标；策略规则填 groupName（会自动生成对应代理组）
//       格式：["TYPE", "value_or_provider_key", "target"]
//         - TYPE = RULE-SET | DOMAIN | GEOIP | MATCH
//         - 最后一项为 MATCH 时 value 填空字符串 ""
// ────────────────────────────────────────────────────────────
const RULES_ORDER = [
  ["RULE-SET", "applications",    "DIRECT"],
  ["DOMAIN",   "clash.razord.top","DIRECT"],
  ["DOMAIN",   "yacd.haishan.me", "DIRECT"],
  ["RULE-SET", "private",         "DIRECT"],
  ["RULE-SET", "reject",          "REJECT"],
  ["RULE-SET", "icloud",          "DIRECT"],
  ["RULE-SET", "apple",           "DIRECT"],
  ["RULE-SET", "steamCN",         "DIRECT"],
  ["RULE-SET", "ai",              "🤖 AI"],          // → UI 可选
  ["DOMAIN",   "meta.com",        "🤖 AI"],
  ["RULE-SET", "steam",           "🎮 Steam"],       // → UI 可选
  ["RULE-SET", "nikkeExpend",     "🪻 NikkeExpend"],       // → UI 可选
  ["RULE-SET", "google",          "🌐 Google"],      // → UI 可选
  ["RULE-SET", "proxy",           "🔀 代理域名"],    // → UI 可选
  ["RULE-SET", "direct",          "DIRECT"],
  ["RULE-SET", "lancidr",         "DIRECT"],
  ["RULE-SET", "cncidr",          "DIRECT"],
  ["RULE-SET", "telegramcidr",    "✈️ Telegram"],   // → UI 可选
  ["GEOIP",    "LAN",             "DIRECT,no-resolve"],
  ["GEOIP",    "CN",              "DIRECT,no-resolve"],
  ["MATCH",    "",                SELECTOR_NAME],
];

// ────────────────────────────────────────────────────────────
//  § 5  主函数（无需改动）
// ────────────────────────────────────────────────────────────
function main(config) {

  // 5.1  合并所有 rule-providers
  const allProviders = { ...FIXED_PROVIDERS };
  for (const p of POLICY_RULES) {
    allProviders[p.key] = p.provider;
  }
  config["rule-providers"] = Object.assign(
    {},
    config["rule-providers"] || {},
    allProviders
  );

  // 5.2  构建地区节点组
  const proxies = config.proxies || [];
  const regionProxyNames = {};
  for (const region of REGION_CONFIG) {
    regionProxyNames[region.name] = proxies
      .filter((p) => region.filter.test(p.name))
      .map((p) => p.name);
    console.log(`[地区过滤] ${region.name}：${regionProxyNames[region.name].length} 个节点`);
  }

  const allRegionProxies = Object.values(regionProxyNames).flat();
  const fallbackProxies  = allRegionProxies.length > 0 ? allRegionProxies : ["DIRECT"];

  const regionGroups = REGION_CONFIG.map((region) => {
    const names = regionProxyNames[region.name];
    return {
      name: region.name,
      type: names.length > 0 ? region.type : "select",
      url: region.url, interval: region.interval, tolerance: region.tolerance,
      proxies: names.length > 0 ? names : ["DIRECT"],
    };
  });

  // 5.3  顶层固定组
  const selectorGroup = {
    name: SELECTOR_NAME, type: "select",
    proxies: [AUTO_NAME, FALLBACK_NAME, ...REGION_CONFIG.map((r) => r.name), "DIRECT"],
  };
  const autoGroup = {
    name: AUTO_NAME, type: "url-test",
    url: "http://www.gstatic.com/generate_204",
    interval: 300, tolerance: 50, proxies: fallbackProxies,
  };
  const fallbackGroup = {
    name: FALLBACK_NAME, type: "fallback",
    url: "http://www.gstatic.com/generate_204",
    interval: 300, proxies: fallbackProxies,
  };

  // 5.4  为每条策略规则自动生成 select 代理组
  //      选项顺序：default 优先 → 其余地区组 → 节点选择 → DIRECT → REJECT
  const regionNames   = REGION_CONFIG.map((r) => r.name);
  const policyOptions = [SELECTOR_NAME, ...regionNames, "DIRECT", "REJECT"];

  const policyGroups = POLICY_RULES.map((p) => {
    const opts = [
      p.default,
      ...policyOptions.filter((o) => o !== p.default),
    ];
    return { name: p.groupName, type: "select", proxies: opts };
  });

  // 5.5  保留原始订阅里不在本脚本管辖范围内的代理组
  const managedNames = new Set([
    SELECTOR_NAME, AUTO_NAME, FALLBACK_NAME,
    ...regionNames,
    ...POLICY_RULES.map((p) => p.groupName),
  ]);
  const existingGroups = (config["proxy-groups"] || []).filter(
    (g) => !managedNames.has(g.name)
  );

  config["proxy-groups"] = [
    selectorGroup,
    autoGroup,
    fallbackGroup,
    ...policyGroups,   // ← 策略组紧跟在顶层三组后面，方便在 UI 里快速找到
    ...regionGroups,
    ...existingGroups,
  ];

  // 5.6  注入规则
  config.rules = RULES_ORDER.map(([type, value, target]) =>
    value ? `${type},${value},${target}` : `${type},${target}`
  );

  return config;
}
