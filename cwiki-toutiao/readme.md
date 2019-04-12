# AMP方案 词条页模板的不同

AMP官方要求的必要元素不再此赘述，测试页面是否符合规范地址栏中追加`#development=1`，查看控制台打印信息；

## 图片

所有的`<img>`需替换为 `<amp-img>` 例如：

```html
<amp-img
  src="//a4.att.hudong.com/04/09/20300543525109150900091910824_0401_480_600.jpg" 
  layout="responsive" 
  width="375" height="233">
</amp-img>
```
必要项：`src` `width` `height`

等比缩放：`layout="responsive"`


如果要**加入全屏图册**，外围要包裹`<figure>`，并为`<amp-img>`添加`lightbox="caption"`，例如：

```html
<figure>
  <amp-img 
    lightbox="caption" 
    src="//a4.att.hudong.com/04/09/20300543525109150900091910824_0401_480_600.jpg" 
    layout="responsive" 
    width="375" height="233">
  </amp-img>
  <figcaption>摘要图</figcaption>
</figure>
```

## 目录跳转

页面目录跳转使用的是 锚点链接 ，正文中所有的二级标题需要添加`ID`，例如：

```html

<a name="27" id="27"></a>
<h3>媒体评价</h3> 

```
参考线上PC端词条页就有锚点

此方案的缺点：目录列表中没有焦点状态，少数一级二级标题跳转后位置太靠顶

## 参考资料角标

正文内容中的，需要过滤删除角标`<sup>[11]</sup>`

## 表格

表格需要过滤掉所有的未知属性，如：

```html
<table pingfang="" sc",="" stheiti,="" simsun,="" sans-serif;="" font-size:="" 12px;="" -ms-word-break:="" break-all;="" -ms-word-wrap:="" break-word;"="" class="table"> 
  <thead> 
   <tr> 
    <th pingfang="" sc",="" stheiti,="" "microsoft="" yahei",="" sans-serif;="" font-size:="" 15px;="" font-weight:="" normal;="" border-right-style:="" solid;="" border-bottom-style:="" border-left-style:="" -ms-word-break:="" break-all;="" -ms-word-wrap:="" break-word;="" background-color:="" #f7fbff;"="">内容</th> 
```

超宽超长表格展现有两种方案：

1. 使用`amp-carousel`包裹`table`的，溢出部分会提供滚动或点击滚屏的效果；但必须指定高度，为了避免文字遮一半的情况，每行高度必须固定，即文字不允许换行；表格的收起展开功能需要获得当前表格的行数用于计算总高度。

2. 使用现有`scrollable` 加 `overflow:scroll`也能实现 溢出部分滚动，但体验也许没上面的好；表格的收起展开使用CSS的`nth-child(1n+4)`方法，动态切换`class`也能实现，但是不能判断当前表格需不需要收起展开功能。

收起展开功能需要考虑一个问题：如果表格行超多占二屏三屏高度了，那么展开收起时，页面的停留位置会严重脱离阅读位置；

## 信息模块

展开收起功能同样存在页面停留位置问题

## 音频

因为`amp-audio`只支持单个音频播放，且不支持事件控制，而且amp-html本身支持的事件也很简单；
而我们的摘要播音是分多段，需要连续播放的，这样：

1. 需要根据文字长度计算音频分了几段
2. 需要实现音频的连续播放
3. 需要实现音频的卸载

这样使用了`amp-iframe`,在独立页面中播放音频。

需要传入参数：count(音频的段数) url(摘要音频地址)

## 视频

还没研究，需要考虑问题：

- 封面图与视频的切换
- 视频是否需要固顶或卸载
- 是否会存在轮播视频
- 广告视频播放

