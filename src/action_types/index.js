const actionTypes = {
  POLL_NAME_SUCCESS: "POLL_NAME_SUCCESS",
  POLL_NAME_FAILED: "POLL_NAME_FAILED",
  API_ERROR: "API_ERROR",
  POLL_START_TIME_SUCCESS: "POLL_START_TIME_SUCCESS",
  POLL_START_TIME_FAILED: "POLL_START_TIME_FAILED",
  POLL_END_TIME_SUCCESS: "POLL_END_TIME_SUCCESS",
  POLL_END_TIME_FAILED: "POLL_END_TIME_FAILED",
  TOTAL_VOTES_SUCCESS: "TOTAL_VOTES_SUCCESS",
  TOTAL_VOTES_FAILED: "TOTAL_VOTES_FAILED",
  POLL_TYPE_SUCCESS: "POLL_TYPE_SUCCESS",
  POLL_TYPE_FAILED: "POLL_TYPE_FAILED",
  VOTER_BASE_LOGIC_SUCCESS: "VOTER_BASE_LOGIC_SUCCESS",
  VOTER_BASE_LOGIC_FAILED: "VOTER_BASE_LOGIC_FAILED",
  PROPOSAL_TALLIES_SUCCESS: "PROPOSAL_TALLIES_SUCCESS",
  PROPOSAL_TALLIES_FAILED: "PROPOSAL_TALLIES_FAILED",
  PROPOSALS_WITH_VOTES_FAILED: "PROPOSALS_WITH_VOTES_FAILED",
  PROPOSALS_WITH_VOTES_SUCCESS: "PROPOSALS_WITH_VOTES_SUCCESS",
  ALL_ACTIVITIES_SUCCESS: "ALL_ACTIVITIES_SUCCESS",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  SHOW_ALL_VOTES: "SHOW_ALL_VOTES",
  ALL_ACTIVITIES_LOG_FAILED: "ALL_ACTIVITIES_LOG_FAILED",
  SEARCH_TEXT_CHANGED: "SEARCH_TEXT_CHANGED",
  CLOSE_API_ERROR_MODAL: "CLOSE_API_ERROR_MODAL",
  CLOSE_HELPER_MODAL: "CLOSE_HELPER_MODAL",
  SHOW_POLLSTAT_LOADER: "SHOW_POLLSTAT_LOADER",
  PROPOSAL_NAME_SELECTED: "PROPOSAL_NAME_SELECTED",
  VOTERS_PAGE_CHANGED: "VOTERS_PAGE_CHANGED",
  ACTIVITIES_PAGE_CHANGED: "ACTIVITIES_PAGE_CHANGED",
  SHOW_ACTIVITY_LOADER: "SHOW_ACTIVITY_LOADER",
  ENTITY_DATA_SUCCESS: "ENTITY_DATA_SUCCESS",
  ENTITY_DATA_FAILED: "ENTITY_DATA_FAILED",
  ENTITY_ACTIVITIES_PAGE_CHANGED: "ENTITY_ACTIVITIES_PAGE_CHANGED",
  ENTITY_MEMBERS_PAGE_CHANGED: "ENTITY_MEMBERS_PAGE_CHANGED",
  ENTITY_ADDRESS_CHANGED: "ENTITY_ADDRESS_CHANGED",
  POLL_ADDRESS_CHANGED: "POLL_ADDRESS_CHANGED",
  ENTITY_MEMBERSHIP_CHECK_SUCCESS: "ENTITY_MEMBERSHIP_CHECK_SUCCESS",
  ENTITY_MEMBERSHIP_CHECK_FAILED: "ENTITY_MEMBERSHIP_CHECK_FAILED",
  VBS_FILE_CHECK_SUCCESS: "VBS_FILE_CHECK_SUCCESS",
  VBS_FILE_CHECK_FAILED: "VBS_FILE_CHECK_FAILED",
  USER_POLL_ACTIVITY_SUCCESS: "USER_POLL_ACTIVITY_SUCCESS",
  USER_POLL_ACTIVITY_FAILED: "USER_POLL_ACTIVITY_FAILED",
  SHOW_ENTITY_ACTIVITY_FILTERS: "SHOW_ENTITY_ACTIVITY_FILTERS",
  PROCESS_ENTITY_ACTIVITIES_FILTERS: "PROCESS_ENTITY_ACTIVITIES_FILTERS",
  ENTITY_ACTIVITIES_START_DATE_SELECTED: "ENTITY_ACTIVITIES_START_DATE_SELECTED",
  ENTITY_ACTIVITIES_END_DATE_SELECTED: "ENTITY_ACTIVITIES_END_DATE_SELECTED",
  RESET_ENTITY_FILTERS: "RESET_ENTITY_FILTERS",
  ASSIGNED_CHECK_BOX_CLICKED: "ASSIGNED_CHECK_BOX_CLICKED",
  APPROVED_CHECK_BOX_CLICKED: "APPROVED_CHECK_BOX_CLICKED",
  REVOKED_CHECK_BOX_CLICKED: "REVOKED_CHECK_BOX_CLICKED",
  SHOW_ENTITY_MEMBERS_FILTERS: "SHOW_ENTITY_MEMBERS_FILTERS",
  PROCESS_ENTITY_MEMBERS_FILTERS: "PROCESS_ENTITY_MEMBERS_FILTERS",
  ENTITY_MEMBERS_START_DATE_SELECTED: "ENTITY_MEMBERS_START_DATE_SELECTED",
  ENTITY_MEMBERS_END_DATE_SELECTED: "ENTITY_MEMBERS_END_DATE_SELECTED",
  RESET_ENTITY_MEMBER_FILTERS: "RESET_ENTITY_MEMBER_FILTERS",
  ENTITY_MEMBER_FILTER_OPTIONS_SELECTED: "ENTITY_MEMBER_FILTER_OPTIONS_SELECTED"
};

export default actionTypes;
