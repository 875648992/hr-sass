import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  redirect: '/permission',
  children: [{
    path: 'permission',
    name: 'permission',
    component: () => import('@/views/permission/index'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}