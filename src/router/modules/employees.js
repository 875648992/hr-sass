import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  redirect: '/employees',
  children: [{
    path: 'employees',
    name: 'employees',
    component: () => import('@/views/employees/index'),
    meta: { title: '员工', icon: 'people' }
  }]
}
