import Vue from 'vue';


// 按需引入vant组件
import {
  NavBar, Icon, Form, Field, Button, Toast, Notify, Search, Swipe, SwipeItem, Lazyload, Grid, GridItem, Col, Row, Image, GoodsAction, GoodsActionIcon, GoodsActionButton, Checkbox, Stepper, SubmitBar, SwipeCell, Card, AddressList, AddressEdit, ContactCard, Popup, Tab, Tabs, List, cell, Dialog,Empty,Divider,Sidebar, SidebarItem ,TreeSelect 
} from 'vant'

// 使用vant组件
[
  NavBar, Icon, Form, Field, Button, Toast, Notify, Search, Swipe, SwipeItem, Lazyload, Grid, GridItem, Col, Row, Image, GoodsAction, GoodsActionIcon, GoodsActionButton, Checkbox, Stepper, SubmitBar, SwipeCell, Card, AddressList, AddressEdit, ContactCard, Popup, Tab, Tabs, List, cell, Dialog,Empty,Divider,Sidebar, SidebarItem,TreeSelect 
].forEach(item => {
  Vue.use(item);
})