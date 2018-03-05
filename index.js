const got = require('got');

class eztvAPI {
    /**
     * @typedef {Object} eztvConfig
     * @property {String} baseUrl - API base URL
     */

    /**
     * Create a new instance of eztvAPI
     * @param {eztvConfig} config - API configuration
     */
    constructor({ baseUrl = 'https://eztv.ag/api/' } = {}) {
        /**
         * eztv API base URL
         * @type {String}
         * @readonly
         * @private
         */
        this._baseUrl = baseUrl;
    }

    /**
     * API request method
     * @param {String} endpoint 
     * @param {Object} query
     * @private 
     */
    async _get(endpoint, query) {
        const uri = `${this._baseUrl}${endpoint}`;
        const res = await got(uri, { query, json: true });

        return res.body;
    }

    /**
     * @typedef {Object} eztvTorrent
     * @property {Number} id Torrent ID
     * @property {String} hash Torrent hash
     * @property {String} filename Torrent file name
     * @property {String} episode_url eztv URL for episode (?)
     * @property {String} torrent_url eztv URL for torrent
     * @property {String} magnet_url Magnet URL for torrent
     * @property {String} title Torrent title
     * @property {String} imdb_id Show IMDB ID
     * @property {String} season Season number
     * @property {String} episode Episode number
     * @property {String} small_screenshot 
     * @property {String} large_screenshot 
     * @property {Number} seeds Number of seeds
     * @property {Number} peers Number of peers
     * @property {Number} date_released_unix Release date in Unix epoch format
     * @property {String} size_bytes Torrent size in bytes
     */

    /**
     * @typedef {Object} eztvOptions
     * @property {Number} limit Limit of shows to fetch (1-100)
     * @property {Number} page Fetch page number
     * @property {String} imdb_id Filter shows by IMDB ID
     */

    /**
     * @typedef {Object} eztvResponse
     * @property {Object} response
     * @property {Number} response.torrents_count - Number of torrents found
     * @property {Number} response.limit - Request limit
     * @property {Number} response.page - Request page number
     * @property {eztvTorrent[]} response.torrents - Array of matched torrents
     */

    /**
     * Fetch the list of shows
     * @param {eztvOptions} options eztv API request options
     * @returns {Promise<eztvResponse>} List of shows from eztv
     */
    getShows({
        limit = 50,
        page = 1,
        imdb_id = ''
    } = {}) {
        if (!~~limit || limit < 1 || limit > 100) {
            throw new Error(`Limit out of range, must be a number between 1 and 100`)
        }

        if (!~~page || page < 1) {
            throw new Error('Page must be a number greater than zero')
        }

        return this._get('get-torrents', { limit, page, imdb_id });
    }
}

module.exports = eztvAPI;