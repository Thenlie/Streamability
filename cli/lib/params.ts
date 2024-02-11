/**
 * A list of all TMDB path parameters with default values.
 *
 * @todo Add non-path params
 *
 * Given a list of paths, you can filter out unique params using the command:
 * `grep -Eo '\{\w+\}' <filename> | sort | uniq`
 */
const DEFAULT_PARAMS = [
    { name: 'account_id', values: ['', ''] },
    { name: 'collection_id', values: ['', ''] },
    { name: 'company_id', values: ['3166', '521'] },
    { name: 'credit_id', values: ['52fe4311c3a36847f8037ee9', '52fe4311c3a36847f8037ec7'] },
    { name: 'episode_id', values: ['385571', '62085'] },
    { name: 'episode_number', values: ['1', '2'] },
    { name: 'external_id', values: ['', ''] },
    { name: 'guest_session_id', values: ['', ''] },
    { name: 'keyword_id', values: ['', ''] },
    { name: 'list_id', values: ['', ''] },
    { name: 'movie_id', values: ['1726', '4232'] },
    { name: 'network_id', values: ['174', '6'] },
    { name: 'person_id', values: ['17419', '70851'] },
    { name: 'review_id', values: ['59cc634fc3a3682aa30065a3', '6313ce428c7b0f0082be0687'] },
    { name: 'season_id', values: ['7240', '3572'] },
    { name: 'season_number', values: ['1', '2'] },
    { name: 'series_id', values: ['2316', '1396'] },
    { name: 'time_window', values: ['day', 'week'] },
    { name: 'tv_episode_group_id', values: ['', ''] },
];

export { DEFAULT_PARAMS };
