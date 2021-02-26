import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  redirect: '/departments',
  children: [{
    path: 'departments',
    name: 'departments',
    component: () => import('@/views/departments/index'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}
