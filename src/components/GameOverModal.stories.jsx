import GameOverModal from './GameOverModal';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Game/GameOverModal',
  component: GameOverModal,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/game/123/start']}>
        <div id="modal-root">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    result: { control: 'select', options: ['win', 'lose', 'time'] },
    word: { control: 'text' },
    hintUsed: { control: 'boolean' },
    onRepeat: { action: 'repeat' },
  },
};

export const Win = {
  args: {
    result: 'win',
    word: 'React',
    hintUsed: false,
  },
};

export const Lose = {
  args: {
    result: 'lose',
    word: 'JavaScript',
    hintUsed: true,
  },
};

export const TimeOut = {
  args: {
    result: 'time',
    word: 'Node.js',
    hintUsed: false,
  },
};
