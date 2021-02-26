import Layout from '@/layout'

export default {
  path: '/setting',
  component: Layout,
  redirect: '/setting',
  children: [{
    path: 'setting',
    name: 'setting',
    component: () => import('@/views/setting/index'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}
