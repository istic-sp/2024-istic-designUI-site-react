import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Icon, SideBar } from '@istic-ui/react';

const meta: Meta<typeof SideBar> = {
  title: 'ISTIC UI/Componentes/Core/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {
    logo: { description: 'ReactNode', control: { type: 'text' } },
    footer: {
      description: 'ReactNode',
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
    padding: 4,
    buttonsRadius: 0,
    items: [
      {
        title: 'First Items',
        subItems: [
          {
            label: 'First Page',
            path: '/firstPage',
            icon: <Icon name="dashboard" />,
            notification: 4,
          },
          {
            label: 'Second Page',
            path: '/secondPage',
            icon: <Icon name="file-list" />,
            notification: 0,
          },
        ],
      },
      {
        title: 'Second Items',
        subItems: [
          {
            label: 'Third Page',
            path: '/thirdPage',
            icon: <Icon name="shake-hands" />,
            notification: 0,
          },
          {
            label: 'Fourth Page',
            path: '/fourthPage',
            icon: <Icon name="building" />,
            notification: 1,
          },
          {
            label: 'Fifth Page',
            path: '/fifthPage',
            icon: <Icon name="tools" />,
            notification: 0,
          },
        ],
      },
    ],
    logo: (
      <img
        src="https://img.freepik.com/free-vector/butterfly-colorful-logo-template_361591-1587.jpg"
        width={100}
        height={50}
      />
    ),
    footer: <div>Footer</div>,
  },
};
