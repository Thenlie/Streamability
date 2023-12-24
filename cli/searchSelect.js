/* eslint-disable indent */
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
    isBackspaceKey,
    Separator,
} from '@inquirer/core';
import chalk from 'chalk';
import figures from 'figures';
import ansiEscapes from 'ansi-escapes';
import { addSpaceToSearchBar, isAlphaNumeric } from './utils.js';

const isSelectable = (item) => {
    return !Separator.isSeparator(item) && !item.disabled;
};

const renderItem = ({ item, isActive }) => {
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
};

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
        return { first, last };
    }, [filteredItems, items]);

    const defaultItemIndex = useMemo(() => {
        if (!('default' in config)) return -1;
        return filteredItems.findIndex(
            (item) => isSelectable(item) && item.value === config.default
        );
    }, [config.default, filteredItems, items]);

    const [active, setActive] = useState(defaultItemIndex === -1 ? bounds.first : defaultItemIndex);

    const selectedChoice = filteredItems.length > 0 ? filteredItems[active] : null;

    useKeypress((key) => {
        if (isAlphaNumeric(key)) {
            const re = new RegExp(search + key.name);
            setFilteredItems(items.filter((item) => re.test(item.name)));
            setSearch(search + key.name);
        } else if (isBackspaceKey(key)) {
            const re = new RegExp(search.slice(0, search.length - 1));
            setFilteredItems(items.filter((item) => re.test(item.name)));
            setSearch(search.slice(0, search.length - 1));
        } else if (key.sequence === '_') {
            const re = new RegExp(search + key.sequence);
            setFilteredItems(items.filter((item) => re.test(item.name)));
            setSearch(search + key.sequence);
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
    let searchBar = chalk.bgWhite.black(
        `${figures.pointer} ${search}${addSpaceToSearchBar(search)}`
    );
    if (firstRender.current) {
        firstRender.current = false;
        message += chalk.dim(' (Use arrow keys or search)');
        searchBar = chalk.bgWhite.black(
            `${figures.pointer} ${'(start typing to search)'}${addSpaceToSearchBar(
                '(start typing to search)'
            )}`
        );
    }

    const page =
        filteredItems.length > 0
            ? usePagination({
                  items: filteredItems,
                  active,
                  renderItem,
                  pageSize,
                  loop,
              })
            : '';

    if (status === 'done') {
        return `${prefix} ${message} ${chalk.cyan(selectedChoice.name || selectedChoice.value)}`;
    }

    const choiceDescription = selectedChoice?.description ? `\n${selectedChoice.description}` : '';

    return `${searchBar}\n${prefix} ${message}\n${page}${choiceDescription}${ansiEscapes.cursorHide}`;
});
