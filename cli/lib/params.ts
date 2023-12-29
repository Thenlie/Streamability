/**
 * Given a list of paths, you can filter out unique params using the command:
 * `grep -Eo '\{\w+\}' <filename> | sort | uniq`
 */
const PARAMS = [
    { name: 'account_id', values: ['', ''] },
    { name: 'collection_id', values: ['', ''] },
    { name: 'company_id', values: ['', ''] },
    { name: 'credit_id', values: ['', ''] },
    { name: 'episode_id', values: ['', ''] },
    { name: 'episode_number', values: ['', ''] },
    { name: 'external_id', values: ['', ''] },
    { name: 'guest_session_id', values: ['', ''] },
    { name: 'keyword_id', values: ['', ''] },
    { name: 'list_id', values: ['', ''] },
    { name: 'movie_id', values: ['1726', '4232'] },
    { name: 'network_id', values: ['', ''] },
    { name: 'person_id', values: ['17419', '70851'] },
    { name: 'review_id', values: ['', ''] },
    { name: 'season_id', values: ['', ''] },
    { name: 'season_number', values: ['', ''] },
    { name: 'series_id', values: ['2316', '1396'] },
    { name: 'time_window', values: ['', ''] },
    { name: 'tv_episode_group_id', values: ['', ''] },
];

export { PARAMS };
