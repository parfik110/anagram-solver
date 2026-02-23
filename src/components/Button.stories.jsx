import Button from './Button';

export default {
  title: 'Example/Button', 
  component: Button,
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export const Primary = {
  args: {
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
  },
};
