<?php
/**
 * Minecraft服务器状态代理API
 * 严格匹配以下两种输出格式：
 * 1. 完整版（含玩家列表）: {"online":true,"host":"45.125.44.66",...}
 * 2. 精简版（无玩家列表）: {"online":true,"host":"play.simpfun.cn",...}
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// 异常处理函数
function send_error($message) {
    http_response_code(500);
    die(json_encode(['error' => $message]));
}

// 获取服务器地址
$serverAddress = $_GET['ip'] ?? '';
if (empty($serverAddress)) {
    send_error('Missing ip parameter');
}

// 获取源数据
$sourceData = json_decode(@file_get_contents('https://list.mczfw.cn/api/'.urlencode($serverAddress)), true);
if ($sourceData === null) {
    send_error('Failed to fetch server data');
}

// 基础字段处理
$result = [
    'online'        => ($sourceData['p'] ?? -1) >= 0,  // 使用玩家数判断在线状态
    'host'          => explode(':', $serverAddress)[0], // 自动提取主机名
    'port'          => explode(':', $serverAddress)[1] ?? 25565, // 默认端口
    'ip_address'    => $sourceData['ip_address'] ?? gethostbyname(explode(':', $serverAddress)[0]),
    'eula_blocked'  => false,  // 固定值
    'retrieved_at'  => round(microtime(true)*1000),
    'expires_at'    => round((microtime(true)+60)*1000), // 60秒有效期
    'srv_record'    => null    // 固定值
];

// 动态处理可能存在的字段
$result['version'] = isset($sourceData['version']) ? $sourceData['version'] : [
    'name_raw'   => 'Unknown',
    'name_clean' => 'Unknown',
    'name_html'  => 'Unknown',
    'protocol'   => -1
];

$result['players'] = [
    'online' => $sourceData['p'] ?? 0,
    'max'    => $sourceData['mp'] ?? 20,
    'list'   => $sourceData['players']['list'] ?? [] // 优先使用原玩家列表
];

$result['motd'] = [
    'raw'   => $sourceData['motd'] ?? '',
    'clean' => isset($sourceData['motd']) ? strip_tags($sourceData['motd']) : '',
    'html'  => $sourceData['motd'] ?? ''
];

// 以下字段严格保持null或空数组
$result['icon'] = null;
$result['mods'] = [];
$result['software'] = null;
$result['plugins'] = [];

// 输出（保持JSON格式化）
echo json_encode($result, 
    JSON_PRETTY_PRINT | 
    JSON_UNESCAPED_UNICODE | 
    JSON_UNESCAPED_SLASHES
);
?>