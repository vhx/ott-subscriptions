/**
 * URL for timeAgo functionality: https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
 */

import React, { Component } from 'react';
import ApiClient from '../client/api.js';
import SearchBar from './search_bar.jsx';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


/**
 * Map redux subscription data state to component properties. 
 */
const mapStateToProps = (state) => {
  return {
  data: state.subscriptions_table
  };
}

/**
 * Map redux subcription table state functions to component properties. 
 */
const mapDispatchToProps = (dispatch) => {
  return {
  updateState: (table_data) => dispatch({type: 'UPDATE_SUB_TABLE', value: table_data}),
  setBuffering: (is_buffering) => dispatch({type: 'SET_BUFFERING', value: is_buffering}),
  setCancelBuffer: (is_cancelling) => dispatch({type: 'SET_CANCELLING', value: is_cancelling})
  };
}

class SubscriptionsTable extends Component {

  constructor(props) {
    super(props);
    this.cache = [];
    this.max_page_entries = 10; // Maximum results per page on table. 
    this.search_placeholder = "Search by name, email or subscription type";
    this.state = {
      initial_loading: true,
      navigator: { // Navigator button 'disabled' properties.
        left_disabled: true, 
        right_disabled: true,
      }
    }
  }


  /**
   * Wrapper to return redux state for component. 
   */
  getReduxState() {
    return this.props.data
  }

  /**
   * Wrapper for redux dispatch mapped to props. 
   */
  updateReduxState(table_data) {
    return this.props.updateState(table_data);
  }

  /**
   * Wrapper for redux dispatch mapped to props. 
   */
  setBuffering(is_buffering) {
    return this.props.setBuffering(is_buffering);
  }

  /**
   * Wrapper for redux dispatch mapped to props. 
   */
  setCancelBuffer(is_cancelling) {
    return this.props.setCancelBuffer(is_cancelling);
  }


  /**
   * Get initial subscription results when component mounts.
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setBuffering(true);

    /* Get initial subscriptions with empty query. */ 
    ApiClient.getSubscriptions().then((res) => {
      const new_state = {...this.getReduxState()}; // Copy state to edit before updating.
      
      new_state.data.page = res['page'];
      new_state.data.total_pages = res['total_pages'];
      new_state.data.subscriptions = res['subscriptions'];
      new_state.table.start_entry = 1;
      new_state.table.total_entries = res['total_results'];

      this.updateReduxState(new_state);
    }).then(() => {
      this.setBuffering(false);
      this.forceUpdate(); // Required to allow component to load more data.
    });
  }


  /**
   * Sets initial loading to false.
   * Update state of navigator buttons.
   * Obtain more data from api if needed. 
   */
  componentDidUpdate() {
    const _rstate = this.getReduxState()
    
    const start_entry = _rstate.table.start_entry;
    const new_start_entry = start_entry + this.max_page_entries;
    const num_loaded_entries = _rstate.data.subscriptions.length;
    const disable_left = start_entry < 2 ? true : false;
    const disable_right = new_start_entry > num_loaded_entries ? true : false;

    /* Set initial loading to false if needed. */
    if (this.state.initial_loading) {
      // Set initial loading to false.
      this.setState((prevState) => ({
        ...prevState,
        initial_loading: false
      }));
    }

    /* Update state of navigator buttons if needed */
    if (disable_left != this.state.navigator.left_disabled || 
      disable_right != this.state.navigator.right_disabled)
    {
      this.setState((prevState) => ({
        navigator: { left_disabled: disable_left, right_disabled: disable_right }
      }));
    }

    /* Get more results from API if needed. */
    const need_pages = _rstate.data.page < _rstate.data.total_pages;
    if (need_pages && !_rstate.status.buffering) {
      this.getData();
    }

    /* Cache the subscriptions in the state if any are new */
    const set_diff = _rstate.data.subscriptions.filter((i) => {
      const index = this.cache.findIndex((t) => (
          t.customer_email === i.customer_email && t.product_name === i.product_name && t.billing_type === i.billing_type
        ));
      return index < 0;
    });

    if (set_diff.length > 0) {
      this.cache = this.cache.concat(set_diff); // Remove duplicates using set.
    }
  }

  /**
   * Obtains data from API given current state.
   */
  getData() {
    var _rstate = this.getReduxState();
    const query = _rstate.data.last_query;
    const page = _rstate.data.page + 1; // To get next api result page.

    this.setBuffering(true);

    ApiClient.getSubscriptions(query, page).then((res) => {
      const _rstate = this.getReduxState();

      const new_state = {
        table: {
          start_entry: _rstate.table.start_entry,
          total_entries: res["total_results"],
        },
        data: {
          page: res["page"],
          total_pages: res["total_pages"],
          subscriptions: _rstate.data.subscriptions.concat(res["subscriptions"]),
          last_query: query
        },
        status: { // Don't need to use status wrappers after ApiClient.getSubscriptions because we set the status state here.
          buffering: false,
          cancelling: false
        }
      }

      return new_state;
    }).then((new_state) => {
      /* Handle interrupt if search occurs while loading. */
      if (_rstate.status.cancelling) {
        this.setCancelBuffer(false);  // See search() comments for more details. 
        this.setBuffering(false);
        this.forceUpdate();
      } else {
        this.updateReduxState(new_state);
      }
    });
  }


  /**
   * Search for subscriptions using the API.
   * 
   * IMPORTANT - We don't set 'state.status.cancelling' to false 
   ** after the first results of search are returned. 
   ** getData() handles setting it back to false in order
   ** to manage state data being overriden. 
   */
  search(query) {
    const _rstate = this.getReduxState();

    if (query == _rstate.data.last_query) {
      return;
    }

    if (!window.navigator.onLine) {
      return this.offlineSearch(query);
    }

    this.setCancelBuffer(true);
    this.setBuffering(true);

    ApiClient.getSubscriptions(query).then((res) => {
      const new_state = {
        table: {
          start_entry: 1,
          total_entries: res["total_results"],
        },
        data: {
          page: res["page"],
          total_pages: res["total_pages"],
          subscriptions: res["subscriptions"],
          last_query: query
        },
        status: { // Don't need to use status wrappers after ApiClient.getSubscriptions because we set the status state here.
          buffering: false,
          cancelling: true
        }
      }

      this.updateReduxState(new_state);
    });
  }


  /**
   * Performs search if offline.
   */
  offlineSearch(query) {
    const new_state = {...this.getReduxState()};
    const queried_data = this.queryCache(query);
    
    queried_data.sort((a, b) => {
      const aDate = new Date(a.subscribed_at);
      const bDate = new Date(b.subscribed_at);
      return aDate > bDate;
    });

    new_state.table.start_entry = 1;
    new_state.table.total_entries = queried_data.length;
    new_state.data.page = 1;
    new_state.data.total_pages = 0;
    new_state.data.subscriptions = queried_data;
    new_state.data.last_query = query;

    this.updateReduxState(new_state);
  }


  /**
   * Queries cached data.
   */
  queryCache(query) {
    return this.cache.filter((item) => {
      /* Function similar to LIKE sql query. */
      const like = (a, b) => {
        return b.toLowerCase().indexOf(a.toLowerCase()) >= 0
      }

      return (like(query, item.customer_email) || like(query, item.product_name) || like(query, item.billing_type));
    });
  }


  /**
   * Obtains range of results being displayed by table.
   * Returns string to display on table header.
   * Ex. '1-13 of 13'
   */
  getRange() {
    const _rstate = this.getReduxState();
    const start_entry = _rstate.table.start_entry;
    const total_entries = _rstate.table.total_entries;
    var to_entry = start_entry + this.max_page_entries - 1; 

    if (total_entries < 1) return "0-0 of 0";

    to_entry = to_entry < total_entries ? to_entry : total_entries; // Check if in bounds. 
    return start_entry + "-" + to_entry + " of " + total_entries;
  }


  /**
   * Sets start_entry to 1 to view first {max_table_entries} results. 
   */
  firstPage() {
    const new_state = {...this.getReduxState()}
    new_state.table.start_entry = 1;
    this.updateReduxState(new_state);
    window.scrollTo(0,0);
  }

  /**
   * Updates start_entry to view last {max_table_entries} results.
   */
  prevPage() {
    const new_state = {...this.getReduxState()}
    const start_entry = new_state.table.start_entry;
    var new_start_entry = start_entry - this.max_page_entries;
    const num_loaded_entries = new_state.data.subscriptions.length;
    new_start_entry = new_start_entry > 1 ? new_start_entry : 1; // Check if in bounds. 
    new_state.table.start_entry = new_start_entry;
    this.updateReduxState(new_state);
    window.scrollTo(0,0);
  }

  /**
   * Updates start_entry to view next {max_table_entries} results.
   */
  nextPage() {
    const new_state = {...this.getReduxState()}
    const start_entry = new_state.table.start_entry;
    var new_start_entry = start_entry + this.max_page_entries;
    const num_loaded_entries = new_state.data.subscriptions.length;
    new_start_entry = new_start_entry <= num_loaded_entries ? new_start_entry : start_entry; // Check if in bounds. 
    new_state.table.start_entry = new_start_entry;
    this.updateReduxState(new_state);
    window.scrollTo(0,0);
  }

  /**
   * Updates start_entry to view last {max_table_entries} results. 
   */
  lastPage() {
    const new_state = {...this.getReduxState()}
    const start_entry = new_state.table.start_entry;
    const total_entries = new_state.table.total_entries;
    var new_start_entry = total_entries - this.max_page_entries + 1;
    new_start_entry = new_start_entry > 1 ? new_start_entry : 1; // Check if in bounds. 
    new_state.table.start_entry = new_start_entry;
    this.updateReduxState(new_state);
    window.scrollTo(0,0);
  }

  /**
   * Functionality for timeAgo was taken 
   * and edited from a StackOverflow answer
   * by user 'fearofawhackplanet'.
   * The URL for the StackOverflow
   * question is at the top of this file.
   */
  timeAgo(previous) {
    const current = new Date();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    var val;

    if (elapsed < msPerMinute) {
      val = Math.round(elapsed/1000);
      return val == 1 ? 'A second ago' : val + ' seconds ago';
    } else if (elapsed < msPerHour) {
      val = Math.round(elapsed/msPerMinute);
      return val == 1 ? 'A minute ago' : val + ' minutes ago';
    } else if (elapsed < msPerDay ) {
      val = Math.round(elapsed/msPerHour)
      return val == 1 ? 'An hour ago' : val + ' hours ago';
    } else if (elapsed < msPerMonth) {
      val = Math.round(elapsed/msPerHour)
      return val == 1 ? 'A day ago' : val + ' days ago';  
    } else if (elapsed < msPerYear) {
      val = Math.round(elapsed/msPerMonth)
      return val == 1 ? 'A month ago' : val + ' months ago';
    } else {
      val = Math.round(elapsed/msPerYear)
      return val == 1 ? 'A year ago' : val + ' years ago'; 
    }
  }


  /**
   * Display component .
   */
  render() {
    const _rstate = this.getReduxState();
    const range_string = this.getRange();
    const lower_bound = _rstate.table.start_entry - 1;
    const upper_bound = lower_bound + this.max_page_entries;
    var display_data = _rstate.data.subscriptions.slice(lower_bound, upper_bound);
    const is_loading_new_data = (display_data.length < 1 && _rstate.table.start_entry < _rstate.table.total_entries) || this.state.initial_loading;
    var no_cache_to_display = true;
    
    if (is_loading_new_data) {
      display_data = this.queryCache(_rstate.data.last_query).slice(lower_bound, upper_bound);
      no_cache_to_display = (display_data.length < 1 && _rstate.table.start_entry < _rstate.table.total_entries);
    }

    const table_header = (
      <tr>
       <td className="t-1">CUSTOMER</td>
       <td className="t-2">PRODUCT</td>
       <td className="t-3">{range_string}</td>
      </tr>
    );

    const table_rows = display_data.map((item, key) => {
      return(
        <tr key={key}>
          <td className="t-1">{item.customer_email}</td>
          <td className="t-2">{item.product_name}</td>
          <td className="t-3">{this.timeAgo(new Date(item.subscribed_at))}</td>
        </tr>
      );
    });

    const info_label = !is_loading_new_data ? (display_data.length < 1 ? <p>No results</p> : null) : (no_cache_to_display ? <p>Loading...</p> : null);


    const navigator_actions = (
      <div className="navigator-actions">
        <button className="nav-btn-small" disabled={this.state.navigator.left_disabled} onClick={this.firstPage.bind(this)}><FontAwesomeIcon icon="angle-double-left" /></button>
        <button className="nav-btn-lg" disabled={this.state.navigator.left_disabled} onClick={this.prevPage.bind(this)}><FontAwesomeIcon icon="chevron-left" /></button>
        <button className="nav-btn-lg" disabled={this.state.navigator.right_disabled} onClick={this.nextPage.bind(this)}><FontAwesomeIcon icon="chevron-right" /></button>
        <button className="nav-btn-small" disabled={this.state.navigator.right_disabled} onClick={this.lastPage.bind(this)}><FontAwesomeIcon icon="angle-double-right" /></button>
      </div>
    );


    return(
      <div className="table-wrapper">
        <div className="subscriptions-header">
          <div className="search-container">
            <SearchBar submit={(val) => this.search(val)} placeholder={this.search_placeholder} />
          </div>
        </div>
        <div className="subscription-table">
          <table>
            <thead>{table_header}</thead>
            <tbody>{table_rows}</tbody>
          </table>
        </div>
        <div className="info-label">{info_label}</div>
        <div className="table-navigator">{navigator_actions}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsTable); // Connect component to redux store. 