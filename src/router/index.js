import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import About from '@/components/About';
import Admin from '@/components/admin/Admin';
import AdminUser from '@/components/admin/AdminUser';
import AdminCountry from '@/components/admin/AdminCountry';
import AdminMatch from '@/components/admin/AdminMatch';
import User from '@/components/user/User';
import UserMatch from '@/components/user/UserMatch';
import UserLeaderboard from '@/components/user/UserLeaderboard';
import UserList from '@/components/user/UserList';
import UserResult from '@/components/user/UserResult';
import PageNotFound from '@/components/common/PageNotFound';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/about',
    name: 'About',
    component: About
  }, {
    path: '/admin/',
    name: 'Admin',
    component: Admin,
    children: [ 
      {
        path: 'user',
        name: 'AdminUser',
        component: AdminUser,
      }, 
      {
        path: 'country',
        name: 'AdminCountry',
        component: AdminCountry,
      }, 
      {
        path: 'match',
        name: 'AdminMatch',
        component: AdminMatch,
      }, 
    ]
  }, {
    path: '/user',
    name: 'User',
    component: User,
    children: [ 
      {
        path: 'match',
        name: 'UserMatch',
        component: UserMatch,
      }, 
      {
        path: 'leaderboard',
        name: 'UserLeaderboard',
        component: UserLeaderboard,
      }, 
      {
        path: 'list',
        name: 'UserList',
        component: UserList,
      }, 
      {
        path: 'result',
        name: 'UserResult',
        component: UserResult,
      }, 
    ]
  }, {
    path: '/*',
    name: 'PageNotFound',
    component: PageNotFound,
  }, 
];

export default new VueRouter({
  mode: 'history',
  saveScrollPosition: true,
  routes,
});