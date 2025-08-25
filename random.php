<?php
header('Content-Type: application/json');

// 确保返回的图片来自多个候选项，而不是固定返回同一张

$dates = ['25.7.21', '25.7.23', '25.7.19', '25.7.17']; // 多个已知有图的日期
$maxIndex = 5;
$base = 'http://enginecat.cn/img/ai/page/';

$possibleImages = [];

foreach ($dates as $date) {
    for ($i = 1; $i <= $maxIndex; $i++) {
        $url = $base . $date . '/' . $i . '.jpg';
        $headers = @get_headers($url, 1);
        if ($headers && strpos($headers[0], '200') !== false) {
            $possibleImages[] = $url;
        }
    }
}

// 随机返回其中一张
if (!empty($possibleImages)) {
    $randomUrl = $possibleImages[array_rand($possibleImages)];
    echo json_encode(['url' => $randomUrl]);
    exit;
}

echo json_encode(['error' => '没有可用的图片']);