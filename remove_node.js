function main(config) {
  // 1. 定义排除规则
  // 将之前的 "Singapore | 07" 与新的国家/关键词列表合并
  // 注意：Singapore 后的 "|" 需要双斜杠转义 "\\|" 以匹配字面量
  const excludePattern = "Singapore \\| 07|South Korea|Canada|Great Britain|Turkey|Netherlands|France|Germany|Vietnam|Malaysia|Thailand|Philippines|Taiwan|Expire|Traffic|GB";
  
  // 2. 创建正则对象，"i" 参数表示忽略大小写 (对应原正则中的 (?i))
  const excludeRegex = new RegExp(excludePattern, "i");

  if (config["proxy-groups"]) {
    config["proxy-groups"].forEach(group => {
      if (group.proxies && Array.isArray(group.proxies)) {
        // 3. 使用正则进行过滤：只保留“不匹配”该正则的节点
        group.proxies = group.proxies.filter(nodeName => !excludeRegex.test(nodeName));
      }
    });
  }
  
  return config;
}