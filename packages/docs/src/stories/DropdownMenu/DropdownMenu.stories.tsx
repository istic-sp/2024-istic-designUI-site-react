import React from 'react';
import { Meta } from '@storybook/react';
import { ActionIcon, DropdownMenu, DropdownMenuProps } from '@stick-ui/lib';

const meta: Meta<DropdownMenuProps> = {
  title: 'STICK UI/Components/Core/DropdownMenu',
  component: DropdownMenu,
  argTypes: {
    mainItem: {
      description: 'The main item that triggers the dropdown.',
    },
    items: {
      description: 'Array of dropdown menu items.',
    },
    position: {
      description:
        '"right" or "left", Position of the dropdown menu relative to the main item.',
      defaultValue: { summary: 'left' },
    },
  },
};

export const Default = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <DropdownMenu
      mainItem={<ActionIcon variant="filled" size="lg" iconName="more-2" />}
      items={[
        {
          iconName: 'edit-box',
          label: 'Edit',
          onClick: () => null,
          disabled: true,
        },
        { iconName: 'lock', label: 'Inactivate', onClick: () => null },
        { iconName: 'trash', label: 'Exclude', onClick: () => null },
      ]}
      position="left"
    />
  </div>
);

export default meta;
