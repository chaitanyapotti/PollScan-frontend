export default function reducer(
  state = {
    voterBaseLogic: "",
    startTime: "",
    endTime: "",
    pollName: "",
    pollType: "",
    denominator: 1,
    numerators: [],
    showPollStatsLoader: true,
    proposals: [],
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
      let denominator = state.denominator;
      let proposals = action.proposals;
      let numerators = state.numerators;
      let tempProposals = [];
      for (let i = 0; i < proposals.length; i++) {
        let proposal = proposals[i];
        proposal["percent"] = ((numerators[i] / denominator) * 100).toFixed(2);
        proposal["weight"] = numerators[i];
        tempProposals.push(proposal);
      }
      let lastHigh = 0;
      let pollLeader = {};
      for (let proposal of tempProposals) {
        if (parseInt(proposal.percent) > lastHigh) {
          lastHigh = parseInt(proposal.percent);
          pollLeader = proposal;
        }
      }
      return {
        ...state,
        proposals: tempProposals,
        pollLeader: pollLeader,
        totalVoteCast: action.totalvotescasted,
        showPollStatsLoader: false
      };
    }

    case "TOTAL_VOTES_SUCCESS": {
      let denominator = parseInt(action.payload);
      let proposals = state.proposals;
      let numerators = state.numerators;
      let tempProposals = [];
      for (let i = 0; i < proposals.length; i++) {
        let proposal = proposals[i];
        if ("weight" in proposal) {
          proposal["percent"] = (100 * (parseInt(numerators[i]) / denominator)).toFixed(2);
        }
        tempProposals.push(proposal);
      }
      let lastHigh = 0;
      let pollLeader = {};
      for (let proposal of tempProposals) {
        if (parseInt(proposal.percent) > lastHigh) {
          lastHigh = parseInt(proposal.percent);
          pollLeader = proposal;
        }
      }
      return { ...state, denominator: action.payload, proposals: tempProposals, pollLeader: pollLeader };
    }

    case "PROPOSAL_TALLIES_SUCCESS": {
      let denominator = state.denominator;
      let proposals = state.proposals;
      let tempProposals = [];
      let numerators = action.payload;
      for (let i = 0; i < proposals.length; i++) {
        let proposal = proposals[i];
        proposal["percent"] = ((numerators[i] / denominator) * 100).toFixed(2);
        proposal["weight"] = numerators[i];
        tempProposals.push(proposal);
      }
      let lastHigh = 0;
      let pollLeader = {};
      for (let proposal of tempProposals) {
        if (parseInt(proposal.percent) > lastHigh) {
          lastHigh = parseInt(proposal.percent);
          pollLeader = proposal;
        }
      }
      return { ...state, proposals: tempProposals, numerators: action.payload, pollLeader: pollLeader };
    }

    case "POLL_START_TIME_SUCCESS": {
      return { ...state, startTime: action.payload };
    }

    case "POLL_END_TIME_SUCCESS": {
      return { ...state, endTime: action.payload };
    }

    default: {
      return { ...state };
    }
  }
}
