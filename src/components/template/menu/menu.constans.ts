import { BsBarChart } from 'react-icons/bs'

export const menuItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    Icon: BsBarChart
  },
  {
    label: 'Dashboard',
    to: '/',
    Icon: BsBarChart
  },
]

// export const subMenuReportItems = [
//   {
//     title: 'CDR',
//     items: [
//       { label: 'Chamadas não atendidas', to: '/relatorios/cdr-chamadas-nao-atendidas' },
//       { label: 'Ligações', to: '/relatorios/cdr-ligacoes' },
//       { label: 'Ligações por ramal', to: '/relatorios/cdr-ligacoes-por-ramal' },
//       // { label: 'Ligações com senha', to: '/relatorios/cdr-ligacoes-com-senha' },
//       { label: 'Ligações por hora', to: '/relatorios/cdr-ligacoes-por-hora' },
//     ]
//   },
//   {
//     title: 'Filas',
//     items: [
//       { label: 'Abandonos', to: '/relatorios/filas-abandonos' },
//       { label: 'Ligações por membro', to: '/relatorios/filas-ligacoes-por-membro' },
//       // { label: 'Chamadas não atendidas', to: '/relatorios/filas-chamadas-nao-atendidas' },
//       { label: 'Tempo de espera', to: '/relatorios/filas-tempo-de-espera' },
//       // { label: 'Analítico', to: '/relatorios/filas-analitico' },
//     ]
//   },
//   {
//     title: 'Ramais',
//     items: [
//       { label: 'Tempo em ligação', to: '/relatorios/ramais-tempo-em-ligacao' },
//     ]
//   },
//   {
//     title: 'URA',
//     items: [
//       { label: 'Opções acessadas', to: '/relatorios/ura-opcoes-acessadas' },
//     ]
//   },
//   {
//     title: 'Outros',
//     items: [
//       { label: 'Pesquisa de satisfação', to: '/relatorios/pesquisa-de-satisfacao' },
//     ]
//   }
// ]