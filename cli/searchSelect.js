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
    isNumberKey,
    Separator,
} from '@inquirer/core';
import chalk from 'chalk';
import figures from 'figures';
import ansiEscapes from 'ansi-escapes';

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
    const [filter, setFilter] = useState(items);

    const bounds = useMemo(() => {
        const first = filter.findIndex(isSelectable);
        const last = filter.length - 1 - [...filter].reverse().findIndex(isSelectable);
        if (first < 0)
            throw new Error('[select prompt] No selectable choices. All choices are disabled.');
        return { first, last };
    }, [filter, items]);

    const defaultItemIndex = useMemo(() => {
        if (!('default' in config)) return -1;
        return filter.findIndex((item) => isSelectable(item) && item.value === config.default);
    }, [config.default, filter, items]);

    const [active, setActive] = useState(defaultItemIndex === -1 ? bounds.first : defaultItemIndex);

    // Safe to assume the cursor position always point to a Choice.
    const selectedChoice = filter[active];

    useKeypress((key) => {
        /**
         * TODO:
         * [ ] - Don't set for modifier keys
         * [ ] - Handle backspace
         * [ ] - Handle left/right arrow keys ?
         */
        setSearch(search + key.name);
        const re = new RegExp(search);
        setFilter(filter.filter((item) => re.test(item.name)));
        // console.log(filter);

        if (isEnterKey(key)) {
            setStatus('done');
            done(selectedChoice.value);
        } else if (isUpKey(key) || isDownKey(key)) {
            if (
                loop ||
                (isUpKey(key) && active !== bounds.first) ||
                (isDownKey(key) && active !== bounds.last)
            ) {
                const offset = isUpKey(key) ? -1 : 1;
                let next = active;
                do {
                    next = (next + offset + filter.length) % filter.length;
                } while (!isSelectable(filter[next]));
                setActive(next);
            }
        } else if (isNumberKey(key)) {
            const position = Number(key.name) - 1;
            const item = filter[position];
            if (item != null && isSelectable(item)) {
                setActive(position);
            }
        }
    });

    let message = chalk.bold(config.message);
    if (firstRender.current) {
        firstRender.current = false;
        message += chalk.dim(' (Use arrow keys or search)');
    }

    const page = usePagination({
        items: filter,
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
