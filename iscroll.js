(function(w){
    Iscroll = function(){}
    Iscroll.prototype._wrapper = null;
    Iscroll.prototype.init = function(obj){
        if(typeof(obj) == 'string'){
            this._wrapper = document.querySelector(obj);
        }else{
            this._wrapper = obj;
        }
        var content = this._wrapper;
        var startY;
        content.addEventListener('touchstart', function (e) {
            startY = e.touches[0].clientY;
        });

        content.addEventListener('touchmove', function (e) {
            // 高位表示向上滚动
            // 底位表示向下滚动
            // 1容许 0禁止
            var status = '11';
            var ele = this;

            var currentY = e.touches[0].clientY;

            if (ele.scrollTop === 0) {
                // 如果内容小于容器则同时禁止上下滚动
                status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
            } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
                // 已经滚到底部了只能向上滚动
                status = '10';
            }

            if (status != '11') {
                // 判断当前的滚动方向
                var direction = currentY - startY > 0 ? '10' : '01';
                // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
                if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                    stopEvent(e);
                }
            }
            e.stopPropagation();
        });
        return this;
    };

    /**
     * [scrollToElement description]
     * @Author   Garbo
     * @DateTime 2016-03-18T10:51:28+0800
     * @param    {[string]}                 obj      id名称'#id' 或 dom元素
     * @param    {[int]}                 durtime    过渡时间
     */
    Iscroll.prototype.scrollToElement = function(obj, durtime){
        if(typeof(obj) == 'string'){
            var ele = document.querySelector(obj);
        }else{
            var ele = obj;
        }
        var wrapper = this._wrapper;
        var scrollHeight = wrapper.scrollHeight;   /*容器的滚动条高度*/
        var scrollTop = wrapper.scrollTop;  /*容器当前滚动位置*/
        var height = wrapper.offsetHeight;  /*容器高度*/

        var eleTop = ele.offsetTop; /*元素顶部位置*/

        var delay = 10; /*定时器*/
        var dur = Math.round(durtime/delay);
        var index = 0;
        var timer = null;
        var curTop = scrollTop;
        var subTop = eleTop-scrollTop;
        var self = this;
        // console.log(subTop);
        // console.log(scrollLocation);
        function smoothScroll(t){
            index++;
            var per = Math.round(subTop/dur);
            if(index >= dur){
                self.scrollTo(t);
                clearInterval(timer);
                return;
            }else{
                self.scrollTo(curTop + index*per);
            }
        };
        timer = setInterval(function(){
            smoothScroll(eleTop);
        }, delay);

    };
    /**
     * [scrollTo description]
     * @Author   Garbo
     * @DateTime 2016-05-13T15:05:31+0800
     * @param    {[int]}                 location 滚动到某个位置
     */
    Iscroll.prototype.scrollTo = function(location){
        this._wrapper.scrollTop = location;
    };
    /**
     * [stopTouchmove 禁止元素的touchmove]
     * @Author   Garbo
     * @DateTime 2016-05-13T15:06:24+0800
     * @param    {[array]}                 obj 名称数组['#header', '#footer']
     */
    Iscroll.prototype.stopTouchmove = function(obj){
        for(var i=0, len=obj.length; i<len; i++){
            document.querySelector(obj[i]).addEventListener('touchmove', function(e){
                stopEvent(e);
            });  
        }

    };
    function stopEvent(e){
        e.preventDefault();
        // console.log('Default prevented');
    }
})(window);




