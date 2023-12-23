import {
    createPrompt,
    useState,
    useKeypress,
    usePrefix,
    usePagination,
    useRef,
    useMemo,
    isEnterKey,
    isUpKey,
    isDownKey,
    Separator,
} from '@inquirer/core';
import chalk from 'chalk';
import figures from 'figures';
import ansiEscapes from 'ansi-escapes';
import { isAlphaNumeric } from './utils.js';

function isSelectable(item) {
    return !Separator.isSeparator(item) && !item.disabled;
}

function renderItem({ item, isActive }) {
    if (Separator.isSeparator(item)) {
        return ` ${item.separator}`;
    }

    const line = item.name || item.value;
    if (item.disabled) {
        const disabledLabel = typeof item.disabled === 'string' ? item.disabled : '(disabled)';
        return chalk.dim(`- ${line} ${disabledLabel}`);
    }

    const color = isActive ? chalk.cyan : (x) => x;
    const prefix = isActive ? figures.pointer : ' ';
    return color(`${prefix} ${line}`);
}

export default createPrompt((config, done) => {
    const { choices: items, loop = true, pageSize } = config;
    const firstRender = useRef(true);
    const prefix = usePrefix();
    const [status, setStatus] = useState('pending');
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const bounds = useMemo(() => {
        const first = filteredItems.findIndex(isSelectable);
        const last =
            filteredItems.length - 1 - [...filteredItems].reverse().findIndex(isSelectable);
        if (first < 0)
            throw new Error('[select prompt] No selectable choices. All choices are disabled.');
        return { first, last };
    }, [filteredItems, items]);

    const defaultItemIndex = useMemo(() => {
        if (!('default' in config)) return -1;
        return filteredItems.findIndex(
            (item) => isSelectable(item) && item.value === config.default
        );
    }, [config.default, filteredItems, items]);

    const [active, setActive] = useState(defaultItemIndex === -1 ? bounds.first : defaultItemIndex);

    // Safe to assume the cursor position always point to a Choice.
    const selectedChoice = filteredItems[active];

    // key: { sequence: 'a', name: 'a', ctrl: false, meta: false, shift: false }
    useKeypress((key) => {
        /**
         * TODO:
         * [ ] - Don't set for modifier keys
         * [ ] - Handle backspace
         * [ ] - Handle left/right arrow keys ?
         * [ ] - Handle empty filteredItems list
         */
        if (isAlphaNumeric(key)) {
            setSearch(search + key.name);
            const re = new RegExp(search);
            setFilteredItems(filteredItems.filter((item) => re.test(item.name)));
        }

        if (isEnterKey(key)) {
            setStatus('done');
            done(selectedChoice.value);
        } else if (key.name !== 'j' && key.name !== 'k' && (isUpKey(key) || isDownKey(key))) {
            if (
                loop ||
                (isUpKey(key) && active !== bounds.first) ||
                (isDownKey(key) && active !== bounds.last)
            ) {
                const offset = isUpKey(key) ? -1 : 1;
                let next = active;
                do {
                    next = (next + offset + filteredItems.length) % filteredItems.length;
                } while (!isSelectable(filteredItems[next]));
                setActive(next);
            }
        }
    });

    let message = chalk.bold(config.message);
    if (firstRender.current) {
        firstRender.current = false;
        message += chalk.dim(' (Use arrow keys or search)');
    }

    const page = usePagination({
        items: filteredItems,
        active,
        renderItem,
        pageSize,
        loop,
    });

    if (status === 'done') {
        return `${prefix} ${message} ${chalk.cyan(selectedChoice.name || selectedChoice.value)}`;
    }

    const choiceDescription = selectedChoice.description ? `\n${selectedChoice.description}` : '';

    return `${search}\n${prefix} ${message}\n${page}${choiceDescription}${ansiEscapes.cursorHide}`;
});

export { Separator };
