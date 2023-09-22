// http是我们二次封装好的axios
import http from './http'

import md5 from 'js-md5'

// 登录接口
export function login(name, pwd) {
    return http.post('/user/login', {
        loginName: name,
        passwordMd5: md5(pwd)
    })
}

// 注册接口
export function register(name, pwd) {
    return http.post('/user/register', {
        loginName: name,
        password: pwd
    })
}


// 轮播图
export function carousel() {
    return http.get('/index-infos')
}

// 搜索框
export function search(pageNumber, keyword, orderBy) {
    return http.get('/search', {
        params: {
            pageNumber,
            keyword,
            orderBy,
        }
    })
}

// 搜索框
export function categorySearch(pageNumber, goodsCategoryId,keyword, orderBy) {
    return http.get('/search', {
        params: {
            pageNumber,
            goodsCategoryId,
            keyword,
            orderBy,
        }
    })
}


// 商品详情
export function goodsDetail(id) {
    return http.get(`/goods/detail/${id}`)
}


// 购物车
export function addCart(options) {
    // options { goodsId,goodsCount }
    return http.post('/shop-cart', options)
}


// 购物车列表
export function getCartList() {
    return http.get('/shop-cart')
}



// 商品数量
export function changeNumber(cartItemId, goodsCount) {
    return http.put('/shop-cart', {
        cartItemId, goodsCount
    })
}

// 删除购物车商品
export function deleteGoods(id) {
    return http.delete('/shop-cart/' + id)
}


// ================= 获取地址列表
export function getAddressList() {
    return http.get('/address')
}

// ================= 根据ID获取单个地址实现回显
export function getAddressDetail(id) {
    return http.get('/address/' + id)
}

// ================= 修改地址
export function updateAddress(obj) {
    return http.put('/address', obj)
}

// ================= 添加地址
export function addAddress(obj) {
    return http.post('/address', obj)
}

// ================= 删除地址
export function delAddress(id) {
    return http.delete('/address/' + id)
}

// 获取订单列表
export function getSettleList(cartItemIds) {
    return http.get('/shop-cart/settle?cartItemIds=' + cartItemIds);
}


// 保存订单
export function saveOrderList(obj) {
    return http.post('/saveOrder', obj);
}

// 获取订单列表
export function getOrderList(p, s) {
    return http.get('/order', {
        params: {
            pageNumber: p,
            status: s
        }
    });
}

// 支付接口
export function pay(orderNo, payType) {
    return http.get('/paySuccess', {
        params: {
            orderNo,
            payType
        }
    });
}


// 获取订单详情
export function settleDetail(orderNo) {
    return http.get('/order/' + orderNo);
}

// 交易成功
export function dealSuccess(orderNo) {
    return http.put('/order/' + orderNo + '/finish');
}


// 取消订单
export function cancelDeal(orderNo) {
    return http.put('/order/' + orderNo + '/cancel');
}


// 用户信息
export function userMsg() {
    return http.get('/user/info');
}


// 修改用户信息
export function setInfo({ introduceSign, nickName, passwordMd5 }) {
    return http.put('/user/info', {
        introduceSign, nickName, passwordMd5: md5(passwordMd5)
    });
}


// 退出登录
export function logout() {
    return http.post('/user/logout');
}


// 分类
export function category() {
    return http.get('/categories');
}