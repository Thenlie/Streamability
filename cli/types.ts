import { KeypressEvent } from '@inquirer/prompts';

export interface Key extends KeypressEvent {
    sequence: string;
}
