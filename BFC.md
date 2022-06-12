父元素高度坍塌
    1，给父元素设置固定的高度
    2， 给父元素设置overflow：hidden
    3， 在父元素的尾部，加一个空的div，并给其加clear:both 样式
    4，父元素必须浮动，
    5，给父元素加伪元素 :after{ content: "", display: table; clear: both; height:0; }

为什么overflow:hidden后，父元素会包裹子元素
BFC: 默认情况下，父元素会包裹子元素

解决高度坍塌，原因是一个bfc内，父元素必须包括子元素吗

布局规则：
    1，垂直排列
    2，同一个bfc 内的相邻块元素，在垂直方向上，margin 重叠，水平方向不会
    3


高度坍塌
    1，为父元素设置overflow:hidden属性。
        原理：CSS中的overflow:hidden属性会强制要求父元素必须包裹住所有内部浮动的元素，以及所有元素的margin范围。
    2，在父元素内的结尾追加一个空子元素（块级元素），并设置空子元素清除浮动影响（clear:both）。
        原理：利用clear:both属性和父元素必须包裹含非浮动的元素两个原理。
    3，设置父元素也浮动
        原理：浮动属性也会强制父元素扩大到包含所有浮动的内部元素


问题:子元素设置margin-top，会超出父元素上边的范围，变成父元素的margin-top。

避免垂直方向margin溢出

    5种解决方案

设置父元素overflow:hidden

原理: 父元素变成BFC渲染区域，就必须包裹内层子元素的margin。
缺点: 万一有的子元素，即使溢出父元素，也希望显示呢?就会发生冲突。


为父元素添加上边框，颜色设置为透明(transparent)

原理: 这里不是bfc。而是因为边框本身可以阻隔margin溢出。
缺点: 边框会增大父元素的实际大小，导致布局错乱。


用父元素的padding-top代替第一个子元素的margin-top

原理: 这里也不是bfc。而是因为padding本身可以阻隔margin溢出。、
缺点: 对父元素高度有影响。
解决: 可以设置父元素box-sizing:border-box。


在父元素内第一个子元素之前添加一个空的

原理: table的display属性默认相当于table，所以形成小的bfc渲染区域。其他元素的margin不能进入table范围内。就阻隔了margin向上溢出。
优点: 空table元素没有大小，不占用父元素控件。
缺点: 增加一个看不见的空元素，干扰查找元素。


最好的解决: 父元素::before{ content:""; display:table; }

优点:既不隐藏内容，又不添加新元素，又不影响高度。