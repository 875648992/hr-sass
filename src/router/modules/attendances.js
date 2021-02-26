import Layout from '@/layout'

export default {
  path: '/attendances',
  component: Layout,
  redirect: '/attendances',
  children: [{
    path: 'attendances',
    name: 'attendances',
    component: () => import('@/views/attendances/index'),
    meta: { title: '考勤', icon: 'skill' }
  }]
}
