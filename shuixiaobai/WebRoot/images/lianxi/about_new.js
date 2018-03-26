jq(function () {
    //导航
   
    //自定义滚动条
    function CustomScrollBar() { };
    CustomScrollBar.prototype = {
        Drag: function (obj, oParent) {
            function Drag() { };
            Drag.prototype = {
                init: function (opt) {
                    this.obj = opt.obj;
                    this.oParent = opt.oParent;//放大的元素
                    this.fnDown();
                },
                fnDown: function () {
                    var _this = this;
                    this.obj.onmousedown = function (ev) {
                        new CustomScrollBar().prevent(ev);
                        var ev = ev || event;
                        _this.disX = ev.clientX - this.offsetLeft;
                        _this.disY = ev.clientY - this.offsetTop;
                        if (this.setCapture) {
                            this.onmousemove = function (ev) {
                                _this.fnMove(ev, _this);
                            };
                            this.setCapture();
                            this.onmouseup = _this.fnUp;
                        }
                        else {
                            document.onmousemove = function (ev) {
                                _this.fnMove(ev, _this);
                            };
                            document.onmouseup = _this.fnUp;
                        }
                        return false;
                    };
                },
                fnMove: function (ev, _this) {
                    var ev = ev || event;
                    var l = ev.clientX - _this.disX;
                    var t = ev.clientY - _this.disY;
                    _this.obj.style.left = l + 'px';
                    _this.obj.style.top = t + 'px';
                },
                fnUp: function () {
                    this.onmouseup = null;
                    this.onmousemove = null;
                    if (this.releaseCapture) {
                        this.releaseCapture();
                    }
                }
            };
            return new Drag;
        },
        ScrollBar: function () {
            function ScrollBar() { };
            ScrollBar.prototype = {
                init: function (opt) {
                    this.oParentID = opt.oParentID;
                    this.oScrollTarget = opt.oScrollTarget;
                    this.scrollCss = opt.scrollCss || {};
                    this.createScrollBar();
                    this.scrollDrag();
                    this.mouseScroll();
                },
                createScrollBar: function () {//创建滚动条
                    this.scroll_outer = document.createElement('div');
                    this.scroll_bar = document.createElement('div');
                    this.scroll_outer.className = 'c_scroll';
                    this.scroll_bar.className = 'c_scroll_bar';
                    //this.scroll_outer.style.cssText = 'position: absolute; right: 0;top: 0; width: 7px; height: 100%; border-radius: 5px;' + this.scrollCss.scroll_outer;
                    //this.scroll_bar.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:20%;background-color:#dbdbdb;cursor:pointer;' + this.scrollCss.scroll_bar;
                    this.oParentID.appendChild(this.scroll_outer);
                    this.scroll_outer.appendChild(this.scroll_bar);
                },
                scrollDrag: function () {//添加滚动条拖拽
                    var _that = this;
                    //滚动条拖拽
                    function ScrollDrag() { };
                    ScrollDrag.prototype = new CustomScrollBar().Drag();
                    ScrollDrag.prototype.fnMove = function (ev, _this) {
                        var ev = ev || event;
                        var t = ev.clientY - _this.disY;
                        _that.setTop(t);
                    };
                    var drag = new ScrollDrag();
                    drag.init({
                        obj: this.scroll_bar,
                        oParent: this.scroll_outer
                    });
                },
                setTop: function (t) {//移动的位置
                    var H = this.scroll_outer.offsetHeight - this.scroll_bar.offsetHeight;
                    if (t < 0) {
                        t = 0;
                    }
                    else if (t > H) {
                        t = H;
                    }
                    var scale = t / H;
                    this.scroll_bar.style.top = t + 'px';
                    this.scroll_bar.style.bottom = 'auto';
                    this.oScrollTarget.style.bottom = 'auto';
                    this.oScrollTarget.style.top = (this.scroll_outer.offsetHeight - this.oScrollTarget.offsetHeight) * scale + 'px';
                },
                mouseEvent: function (obj, Fn) {//鼠标滚轮事件
                    if (obj.addEventListener) {
                        obj.onmousewheel === undefined ? obj.addEventListener('DOMMouseScroll', Fn, false) : obj.addEventListener('mousewheel', Fn, false);
                    }
                    else {
                        obj.attachEvent('onmousewheel', Fn);
                    }
                },
                mouseScroll: function () {//鼠标滚轮功能
                    var _this = this;
                    var t = 100;
                    this.mouseEvent(this.oParentID, function (e) {
                        new CustomScrollBar().stopDefault(e);
                        var val = e.wheelDelta || e.detail;
                        if (val == 120 || val == -3) {//向上
                            _this.setTop(_this.scroll_bar.offsetTop - 20);
                        }
                        else {//向下
                            _this.setTop(_this.scroll_bar.offsetTop + 20);
                        }
                    });
                }
            };
            return new ScrollBar;
        },
        prevent: function (e) {
            //冒泡阻止
            e && e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
        },
        //阻止浏览器的默认行为
        stopDefault: function (e) {
            if (e && e.preventDefault)
                e.preventDefault();//火狐谷歌
            else
                window.event.returnValue = false; //IE
            return false;
        }
    };
    window.CustomScrollBar = CustomScrollBar;
    //弹框
    (function () {
        var oBox = jq('.video_box') || '';
        var oTitle = jq('.video_t') || '';
        var oSwf = jq('.video_swf') || '';
        var windowW = jq(window).width();
        var windowH = jq(window).height();
        var ie6 = !-[1, ] && !window.XMLHttpRequest;
        var Video_show = {
            mark: function (btn) {
                if (jq('.markBg').size() == 0) {
                    jq('body').append('<div class="markBg"></div><style>.markBg{position:absolute;top:0;left:0;z-index:8888888;width:100%;height:100%;background:#000;opacity:.5;filter:alpha(opacity=50);}</style>');
                }
                jq('.markBg').height(document.body.offsetHeight);
                if (btn == 'hide') {
                    jq('.markBg').hide();
                }
                else {
                    jq('.markBg').show();
                }
            },
            tk: function (url, title) {
                oTitle.text(title);
                oSwf.html('<embed src=\"' + url + '\" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" class="video_embed"></embed>');
                this.mark();
                if (ie6) {
                    jq(window).scrollTop(0);
                }
                oBox.show();
            },
            tk2: function (text) {
                if (jq('.form_box').size() == 0) {
                    var html = "<div class=\"form_box\">"
                             + "        <strong><i class=\"cor_ico\"></i>提交成功!</strong>"
                             + "        <span></span>"
                             + "        <a href=\"javascript:;\" class=\"form_confirm_btn\" onclick=\"Video_show.close2()\">确定</a>"
                             + "        <a class=\"close_form_box\" title=\"关闭\" onclick=\"Video_show.close2()\"></a>"
                             + "</div>";
                    jq('body').append(html);
                };
                jq('.form_box').find('span').text(text);
                jq('.form_box').show();
                this.mark();
                if (ie6) {
                    jq(window).scrollTop(0);
                }
            },
            close: function () {
                this.mark('hide');
                oBox.hide();
            },
            close2: function () {
                this.mark('hide');
                jq('.form_box').hide();
            }
        };
        window.Video_show = Video_show;

    }());
    //右下方固定导航
    var FixedNav = {
        init: function () {
            this.aLi = jq('.floatWindowBox').find('li');
            if (this.aLi.length) {
                this.business();
            }
            else {
                this.createreTop();
            }
        },
        returnTop: function () {
            jq('body,html').animate({ scrollTop: 0 }, 500);
        },
        business: function () {
            var oBody = jq('body,html');
            this.aLi.eq(0).bind('click', function () {
                oBody.animate({ scrollTop: 1132 });
            });
            this.aLi.eq(1).bind('click', function () {
                oBody.animate({ scrollTop: 2317 });
            });
            this.aLi.eq(2).bind('click', function () {
                oBody.animate({ scrollTop: 3494 });
            });
        },
        createreTop: function () {
            var html = "<div class=\"floatWindowBox\">"
                     + "    <ul>"
                     + "        <li style=\"filter:alpha(opacity:0);opacity:0;\" class=\"reTop\" onclick=\"FixedNav.returnTop()\"><a href=\"javascript:;\" title=\"返回顶部\"><i class=\"returnBg\"></i></a></li>"
                     + "    </ul>"
                     + "</div>"
            jq('body').append(html);
            jq(window).bind('scroll', function () {
                var t = jq(window).scrollTop();
                if (t == 0) {
                    jq('.reTop').stop().animate({ 'opacity': '0' });
                }
                if (t > 200) {
                    jq('.reTop').stop().animate({ 'opacity': '1' });
                }
            });
        }
    }
    window.FixedNav = FixedNav;
});


/***公司简介***/
jq(function () {
    //大家眼中的土巴兔
    (function () {
        var aLi = jq('.people_talk_list').children('li');
        var aImg = aLi.find('img');
        var aLi_c = jq('.p_talkCenter_list').children('li');
        var arrSrc = [], arrPos = [], len = aLi.length, zIndex = 0;
        var bStop = true;
        for (var i = 0; i < len; i++) {
            arrPos[i] = aLi[i].offsetLeft;
            aLi[i].style.left = aLi[i].offsetLeft + 'px';
            aImg[i].index = i;
            arrSrc[i] = aImg[i].src;
        }
        for (var i = 0; i < len; i++) {
            aLi[i].style.margin = '0';
            aLi[i].style.position = 'absolute';
        }
        aImg.click(function () {
            var _this = jq(this);
            if (bStop) {
                for (var i = 0; i < len; i++) {
                    aImg.eq(i).animate({ 'margin-left': '0', 'width': '118px', 'height': '118px' }, 100);
                    aImg.eq(i).attr('src', arrSrc[i]);
                    bStop = false;
                    aLi_c.eq(i).hide();
                }
                tab(_this);
                aLi_c.eq(_this[0].index).show();
            }
        });
        function tab(obj) {
            for (var i = 0; i < len; i++) {
                if (aLi[i].offsetLeft == arrPos[2]) {
                    aLi.eq(i).animate({ 'left': aLi[obj[0].index].offsetLeft + 'px' });
                }
            }
            try {
                aLi.eq(obj[0].index).css({ 'z-index': zIndex++ });
                aLi.eq(obj[0].index).animate({ 'left': arrPos[2] + 'px' }, function () {
                    obj.attr('src', obj.attr('data-src'));
                    obj.animate({ 'margin-top': '-4px', 'margin-left': '-5px', 'width': '126px', 'height': '126px' }, 100);
                    bStop = true;
                });
            } catch (e) { }
        }
        //初始
        tab(aImg.eq(2));
    }());
});

/***员工风采***/
jq(function () {
    //乐在土巴兔
    (function () {
        var aLi = jq('.lok_at_list').children('li');
        var aCircle = aLi.find('span');
        var windowH = jq(window).height();
        jq(window).bind('scroll', function () {
            var t = jq(window).scrollTop();
            for (var i = 0; i < aCircle.size() ; i++) {
                if (aLi.eq(i).offset().top - windowH / 2 < t) {
                    aCircle.eq(i).show();
                    aCircle.eq(i).addClass('icur');
                }
                if (aCircle.eq(i).offset().top - windowH > t) {
                    aCircle.eq(i).removeClass('icur');
                }
            }
        });
    }());
    //成长土巴兔
    (function () {
        var aLi = jq('.grow_list').children('li');
        aLi.hover(function (e) {
            var _this = jq(this),
                _desc = _this.find(".grow_hover").stop(true),
                width = _this.width(),
                height = _this.height(),
                left = e.offsetX,
                top = e.offsetY,
                right = width - left,
                bottom = height - top,
                rect = {},
                _min = Math.min(left, top, right, bottom),
                _out = e.type == "mouseleave",
                spos = {};
            _this.addClass('grow_cur');
            rect[left] = function (epos) {
                spos = { "left": -width, "top": 0 };
                if (_out) {
                    _desc.animate(spos, "fast");
                    _this.removeClass('grow_cur');
                } else {
                    _desc.css(spos).animate(epos, "fast");
                }
            };

            rect[top] = function (epos) {
                spos = { "top": -height, "left": 0 };
                if (_out) {
                    _desc.animate(spos, "fast");
                    _this.removeClass('grow_cur');
                } else {
                    _desc.css(spos).animate(epos, "fast");
                }
            };

            rect[right] = function (epos) {
                spos = { "left": left, "top": 0 };
                if (_out) {
                    _desc.animate(spos, "fast");
                    _this.removeClass('grow_cur');
                } else {
                    _desc.css(spos).animate(epos, "fast");
                }
            };

            rect[bottom] = function (epos) {
                spos = { "top": height, "left": 0 };
                if (_out) {
                    _desc.animate(spos, "fast");
                    _this.removeClass('grow_cur');
                } else {
                    _desc.css(spos).animate(epos, "fast");
                }
            };
            rect[_min]({ "left": 0, "top": 0 });
        });
    }());

    //感动视频
    (function () {
        var aLi = jq('.a_video_list').children('li');
        aLi.hover(function () {
            jq(this).addClass('a_video_cur');
        }, function () {
            jq(this).removeClass('a_video_cur');
        });
    }());
});


/***商务合作***/
jq(function () {
    var Business = {
        form: function () {
            var name = document.getElementById("joinName"), phone = document.getElementById("joinPhone"), company = document.getElementById("joinCompany"), btn = document.getElementById("joinBtn");
            var userShen = document.getElementById("User_Shen"), UserCity = document.getElementById("User_City");
            function focusOrBlur(obj) {
                obj.onfocus = function () {
                    obj.style.color = "#666";
                    obj.value = obj.value == obj.defaultValue ? "" : obj.value;
                };
                obj.onblur = function () {

                    obj.value == "" ? (obj.value = obj.defaultValue, obj.style.color = "#b8b7b7") : obj.style.color = "#666";
                };
                return focusOrBlur;
            };
            function err(obj, text) {
                if (!obj.div) {
                    obj.div = document.createElement("div");
                    obj.div.className = "err_msg";
                };
                obj.focus();
                obj.div.style.display = "block";
                obj.div.innerHTML = "<i class=\"err_ico\"></i><span>" + text + "</span>";
                obj.parentNode.insertBefore(obj.div, obj.nextSibling);
            };
            document.getElementById("form1").onsubmit = function () {
                if (company.value == "" || company.value == company.defaultValue) {
                    err(company, company.defaultValue);
                    return false;
                }
                else {
                    company.div ? company.div.style.display = "none" : null;
                }
                if (userShen.value == "" || UserCity.value == "") {
                    err(document.getElementById("selectBox"), "请选择所在城市");
                    return false;
                }
                else {
                    document.getElementById("selectBox").div ? document.getElementById("selectBox").div.style.display = "none" : null;
                }
                if (name.value == "" || name.value == name.defaultValue) {
                    err(name, name.defaultValue);
                    return false;
                }
                else {
                    name.div ? name.div.style.display = "none" : null;
                }
                if (!/1[3-8]+\d{9}/.test(phone.value) && !/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(phone.value) || phone.value == "") {
                    err(phone, "请输入正确的电话号码");
                    return false;
                }
                else {
                    phone.div ? phone.div.style.display = "none" : null;
                }
            };
            focusOrBlur(phone)(name)(company);
            return this;
        }
    };
    window.Business = Business;
})

//媒体报道切换
jq(function () {
    (function () {
        var oBox = jq('.media_report_switch');
        oUl = jq('.media_report_tab'),
        aLi = oUl.children('li'),
        len = aLi.size(),
        w = aLi.eq(0).width(),
        oBtnL = jq('.m_r_arrow_l'),
        oBtnR = jq('.m_r_arrow_r'),
        iNow = 0, timer = null;
        try {
            oUl[0].innerHTML += oUl[0].innerHTML;
        } catch (e) { }
        function switchs() {
            oUl.animate({ 'left': -iNow * w });
        };
        function auto() {
            iNow++;
            if (iNow > len) {
                iNow = 1;
                try {
                    oUl[0].style.left = 0;
                } catch (e) { }
            }
            switchs();
            return false;
        };
        function openTimer() {
            timer = setTimeout(function () {
                auto();
                openTimer();
            }, 5000);
        };
        function closeTimer() {
            clearInterval(timer);
        };
        oBtnL.click(function () {
            iNow--;
            if (iNow < 0) {
                iNow = 0;
            }
            else {
                switchs();
            }
        });
        oBtnR.click(function () {
            auto();
        });
        openTimer();
        oBox.hover(function () {
            closeTimer();
        }, function () {
            openTimer();
        });
        jq(window).bind('focus', function () {
            clearInterval(timer);
            openTimer();
        });
        jq(window).bind('blur', function () {
            closeTimer();
        });
    }());
});



//联系我们
jq(function () {
    //滚动条
    (function () {
        function ifNewScrollBar(oParent, oUl) {//内容超出创建滚动条and设置滚动条位置和高度
            var oParentH = oParent.height();
            var oUlH = oUl.height();
            if (oUlH > oParentH) {
                if (oParent.find('.c_scroll_bar').length == 0) {
                    new CustomScrollBar().ScrollBar().init({ //创建滚动条
                        oParentID: oParent[0],
                        oScrollTarget: oUl[0]
                    });
                };
                oParent.find('.c_scroll_bar').css({ 'height': oParentH / oUlH * 100 + '%' });
            }
        };
        ifNewScrollBar(jq('.address_list'), jq('.address_scroll'));
    }());

    //百度地图
    (function () {
        var oUl = jq('.address_scroll');
        var aLi = oUl.children('li');
        var oScroll = jq('.c_scroll');
        var oBar = jq('.c_scroll_bar');
        try {
            var mp = new BMap.Map("allmap");
            mp.centerAndZoom(new BMap.Point(118.796536, 32.04128), 17);
            mp.enableScrollWheelZoom();//鼠标滚轮缩放
            mp.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
            mp.addControl(new BMap.OverviewMapControl());//添加默认缩略地图控件
            //mp.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_TOP_RIGHT }));   //右上角，打开
        } catch (e) { }

        // 自定义覆盖物
        function ComplexCustomOverlay(point, text) {
            this._point = point;
            this._text = text;
        }

        try {
            ComplexCustomOverlay.prototype = new BMap.Overlay();
        } catch (e) { }
        ComplexCustomOverlay.prototype.initialize = function (mp) {
            this._map = mp;
            var div = this._div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            div.innerHTML = this._text;
            mp.getPanes().labelPane.appendChild(div);
            this._div.state = true;
            return div;
        }
        ComplexCustomOverlay.prototype.draw = function () {
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x + 0 + "px";
            this._div.style.top = pixel.y - 20 + "px";
        }

        var Baidu_map = {
            someVar: function () {
                this.num = 0;
            },
            // 将地址解析结果显示在地图上,并调整地图视野
            getPoint: function (obj, city, id) {
                var _this = this;
                var myGeo = new BMap.Geocoder();
                var sAddress = jq(obj).attr('data-address') || obj;
                var aP = jq(obj).find('p');
                myGeo.getPoint(sAddress, function (point) {
                    if (point) {
                        if (obj.state == undefined) {
                            var tag_id = 'msg' + id;
                            var tag_class = id == 0 ? 'each_msg_center each_msg_center_show' : 'each_msg_center';
                            var pHTML = '';
                            //默认覆盖物HTML
                            //var HTML = '<div id="' + id + '" style="position:relative;display:block;width:300px;height:300px;background:#fff;border:1px solid #ccc;box-shadow:0 0 5px rgba(0,0,0,.3);text-align:center;"><a style="display:block;margin-top:40px;color:#5c5c5c;" href="http://www.to8to.com" target="_blank">土巴兔' + obj.value + '</a><span style="color:#999;position:absolute;top:10px;right:10px;cursor:pointer;" onclick=\"Baidu_map.msg(\'' + id + '\',\'hide\');\">X</span></div><div style="cursor:pointer;width:27px;height:26px;position:absolute;top:107px;left:130px;" onclick=\"Baidu_map.msg(\'' + id + '\',\'show\');\"><img src="images/map_ico.png" /><div>';
                            for (var i = 0; i < aP.size() - 1 ; i++) {
                                pHTML += "<p>" + aP.eq(i).text() + "</p>";
                            }
                            var HTML = "<div id=" + tag_id + " class=\"" + tag_class + "\">"
                                    + "<strong>" + jq(obj).find('.pos_name').text() + "</strong>"
                                    + pHTML
                                   
                                    + "<p>地址：" + sAddress + "</p>"
                                   
                                    + "<div class=\"close_msg_box\" title=\"关闭\" onclick=\"Baidu_map.msg(\'" + tag_id + "\',\'hide\');\"></div>"
                                    + "</div>"
                                    + "<div title=\"" + jq(obj).find('.c_url').text().replace(/[^\u4e00-\u9fa5]/g, "") + "\" class=\"map_label\" onclick=\"Baidu_map.clickPoint(\'" + sAddress + "\','',\'" + id + "\');\" onmouseover=\"Baidu_map.icoHover(this,event)\" onmouseout=\"Baidu_map.icoHover(this,event)\"><img src=\"http://img.to8to.com/front_end/bg/map_ico.png\" /></div>";
                            var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(point.lng, point.lat), obj.text || HTML);
                            mp.addOverlay(myCompOverlay);
                            obj.state = true;
                        }
                    }
                }, city);
            },
            clickPoint: function (obj, city, id) {
                var myGeo = new BMap.Geocoder();
                var sAddress = jq(obj).attr('data-address') || obj;
                var t = aLi[1].offsetTop;
                var scale = t / oUl.height() * oScroll.height();//每次滚动多少
                var maxNum = Math.ceil((oScroll.height() - oBar.height()) / scale);//最多能滚几次
                myGeo.getPoint(sAddress, function (point) {
                    if (point) {
                        mp.centerAndZoom(new BMap.Point(point.lng, point.lat + 0.0012), 18);
                    }
                }, city);
                jq('#msg' + id).show();
                //让当前为选中状态
                aLi.eq(id).addClass('a_r_text_cur').siblings().removeClass('a_r_text_cur');
                //更新位置
                if (oBar[0].offsetTop > maxNum * scale) {
                    oUl.animate({ 'top': -oUl[0].offsetHeight / 2 });
                    oBar.animate({ 'top': oScroll.height() - oBar.height() });
                }
                else {
                    oUl.animate({ 'top': -aLi[id].offsetTop });
                    oBar.animate({ 'top': aLi[id].offsetTop / t * scale });
                }
            },
            //打开/关闭信息窗口
            msg: function (id, display) {
                var oBox = document.getElementById(id);
                var a = {};
                a['show'] = function () {
                    oBox.style.display = 'block';
                };
                a['hide'] = function () {
                    oBox.style.display = 'none';
                };
                a[display]();
            },
            //图标小效果
            icoHover: function (obj, e) {
                if (e.type == "mouseover") {
                    jq(obj).stop().animate({ 'margin-top': '-25px' });
                }
                if (e.type == "mouseout") {
                    jq(obj).animate({ 'margin-top': '-20px' });
                }
            }
        };
        function showAll() {
            for (var i = 0; i < aLi.size() ; i++) {
                Baidu_map.getPoint(aLi[i], '1', i);
            };
        };
        window.Baidu_map = Baidu_map;
        Baidu_map.someVar();
        showAll();
    }());
});











