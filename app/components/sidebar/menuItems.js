import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from 'react-icons/md';

export const menuItems = [
  {
    title: 'Índice',
    list: [
      {
        title: 'Tablero',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        title: 'Usuarios',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Productos',
        path: '/dashboard/products',
        icon: <MdShoppingBag />,
      },
      {
        title: 'Transacciones',
        path: '/dashboard/transactions',
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: 'Análisis',
    list: [
      {
        title: 'Ganancias',
        path: '/dashboard/revenue',
        icon: <MdWork />,
      },
      {
        title: 'Reporte',
        path: '/dashboard/reports',
        icon: <MdAnalytics />,
      },
      {
        title: 'Equipo',
        path: '/dashboard/teams',
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: 'Usuario',
    list: [
      {
        title: 'Configuración',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Ayuda',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
];