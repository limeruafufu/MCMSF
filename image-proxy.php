<?php
$url = $_GET['url'] ?? '';

if (!$url || !str_starts_with($url, 'http://enginecat.cn/')) {
    http_response_code(400);
    echo '非法请求';
    exit;
}

$img = @file_get_contents($url);
if ($img === false) {
    http_response_code(404);
    echo '图片获取失败';
    exit;
}

header('Content-Type: image/jpeg');
echo $img;