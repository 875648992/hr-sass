import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  redirect: '/approvals',
  children: [{
    path: 'approvals',
    name: 'approvals',
    component: () => import('@/views/approvals/index'),
    meta: { title: '审批', icon: 'tree-table' }
  }]
}
