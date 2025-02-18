import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, SideBar } from '@istic-ui/react';
const meta: Meta<typeof SideBar> = {
  title: 'ISTIC UI/Componentes/Core/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {
    logo: {
      description:
        'Elemento React opcional exibido no topo da barra lateral (exemplo: um logotipo).',
      control: { type: 'text' },
    },
    footer: {
      description:
        'Elemento React opcional exibido na parte inferior da barra lateral.',
    },
    activeItem: {
      description: 'Item atualmente ativo na barra lateral.',
      control: { type: 'text' },
    },
    width: {
      description: 'Largura da barra lateral quando expandida.',
      control: { type: 'text' },
    },
    padding: {
      description: 'Espaçamento interno da barra lateral.',
      control: { type: 'number' },
    },
    buttonsRadius: {
      description: 'Raio da borda dos botões do menu.',
      control: { type: 'text' },
    },
    collapseText: {
      description: 'Texto exibido ao lado do botão de colapso.',
      control: { type: 'text' },
    },
    isCollapsed: {
      description:
        'Define se a barra lateral está colapsada (modo controlado).',
      control: { type: 'boolean' },
    },
    onToggleCollapse: {
      description: 'Função chamada ao alternar entre expandido e colapsado.',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100vh',
          background: '#f4f4f4',
          padding: '16px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj = {
  args: {
    padding: 8,
    buttonsRadius: '5px',
    width: '250px',
    collapseText: 'Recolher',
    items: [
      {
        title: 'Dashboard',
        subItems: [
          {
            label: 'Visão Geral',
            path: '/dashboard',
            icon: <Icon name="dashboard" />,
            notification: 2,
          },
          {
            label: 'Relatórios',
            path: '/reports',
            icon: <Icon name="file-list" />,
            notification: 5,
          },
        ],
      },
      {
        title: 'Configurações',
        subItems: [
          {
            label: 'Usuários',
            path: '/users',
            icon: <Icon name="shake-hands" />,
            notification: 0,
          },
          {
            label: 'Empresas',
            path: '/companies',
            icon: <Icon name="building" />,
            notification: 1,
          },
          {
            label: 'Ferramentas',
            path: '/tools',
            icon: <Icon name="tools" />,
            notification: 0,
          },
        ],
      },
    ],
    logo: (
      <img
        src="https://img.freepik.com/free-vector/butterfly-colorful-logo-template_361591-1587.jpg"
        alt="Logo"
        width={100}
        height={50}
      />
    ),
    footer: (
      <div style={{ textAlign: 'center', padding: '8px' }}>
        © {new Date().getFullYear()} ISTIC UI
      </div>
    ),
  },
};
