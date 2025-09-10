#!/usr/bin/env node

/**
 * Google Analytics 快速配置脚本
 * 使用方法: node setup-analytics.js YOUR_GA_MEASUREMENT_ID
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const gaId = process.argv[2];

if (!gaId) {
  console.log('❌ 请提供Google Analytics测量ID');
  console.log('使用方法: node setup-analytics.js G-XXXXXXXXXX');
  console.log('');
  console.log('获取测量ID的步骤:');
  console.log('1. 访问 https://analytics.google.com/');
  console.log('2. 创建新的属性');
  console.log('3. 选择"网站"平台');
  console.log('4. 获取测量ID (格式: G-XXXXXXXXXX)');
  process.exit(1);
}

// 验证测量ID格式
const gaIdPattern = /^(G-|UA-)[A-Z0-9-]+$/;
if (!gaIdPattern.test(gaId)) {
  console.log('❌ 测量ID格式不正确');
  console.log('正确格式: G-XXXXXXXXXX 或 UA-XXXXXXXXX-X');
  process.exit(1);
}

// 读取index.html文件
const indexPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// 替换测量ID
htmlContent = htmlContent.replace(/%VITE_GA_MEASUREMENT_ID%/g, gaId);

// 写回文件
fs.writeFileSync(indexPath, htmlContent);

console.log('✅ Google Analytics配置成功!');
console.log(`📊 测量ID: ${gaId}`);
console.log('');
console.log('下一步:');
console.log('1. 部署网站到生产环境');
console.log('2. 访问网站验证数据收集');
console.log('3. 在Google Analytics中查看实时报告');
console.log('');
console.log('验证方法:');
console.log('- 打开网站，按F12查看Network标签页');
console.log('- 查找gtag/js请求确认发送成功');
console.log('- 在Google Analytics实时报告中查看访问数据');
