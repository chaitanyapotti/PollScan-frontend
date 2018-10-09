export default function reducer(
  state = {
    voterBaseLogic: "",
    startTime: "20 Aug 2018 | 20:26",
    pollName: "",
    pollType: "",
    endTime: "2018-09-30",
    showPollStatsLoader: true,
    proposals: [
      // {name: 'Jacob Radhakrishnan', votes: 1646, percent: 5.98},
      // {name: 'Alex Jonnes', votes: 12652, percent: 50.14},
      // {name: 'N’gawa Tsotsobe', votes: 7707, percent: 33.60},
      // {name: 'Chen Xing', votes: 2360, percent: 10.28}
    ],
    totalVoteCast: 0,
    pollLeader: { name: "", votes: 0, percent: 0 },
    showModal: true
  },
  action
) {
  switch (action.type) {
    case "POLL_NAME_SUCCESS": {
      return { ...state, pollName: action.payload };
    }
    case "SHOW_POLLSTAT_LOADER": {
      return { ...state, showPollStatsLoader: true };
    }
    case "POLL_NAME_FAILED": {
      return { ...state, showModal: true };
    }
    case "POLL_TYPE_SUCCESS": {
      return { ...state, pollType: action.payload };
    }
    case "VOTER_BASE_LOGIC_SUCCESS": {
      return { ...state, voterBaseLogic: action.payload };
    }
    case "PROPOSALS_WITH_VOTES_SUCCESS": {
      return {
        ...state,
        proposals: action.proposals,
        totalVoteCast: action.totalvotescasted,
        pollLeader: action.pollleader,
        showPollStatsLoader: false
      };
    }
    default: {
      return { ...state };
    }
  }
}
