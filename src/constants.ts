
export class Constants {
    // Assuming GovernerBravo (v2)
    public static PROPOSAL_CREATED_EVT_SIG = "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)";
    public static VOTE_CAST_EVT_SIG = "VoteCast(address,uint256,uint8,uint256,string)";
    public static PROPOSAL_CANCELED_EVT_SIG = "ProposalCanceled(uint256)";
    public static PROPOSAL_QUEUED_EVT_SIG = "ProposalQueued(uint256,uint256)";
    public static PROPOSAL_EXECUTED_EVT_SIG = "ProposalExecuted(uint256)";
    public static VOTING_DELAY_SET_EVT_SIG = "VotingDelaySet(uint256,uint256)";
    public static VOTING_PERIOD_SET_EVT_SIG = "VotingPeriodSet(uint256,uint256)";
    public static NEW_IMPLEMENTATION_EVT_SIG = "NewImplementation(address,address)";
    public static PROPOSAL_THRESHOLD_SET_EVT_SIG = "ProposalThresholdSet(uint256,uint256)";
    public static NEW_PENDING_ADMIN_EVT_SIG = "NewPendingAdmin(address,address)";
    public static NEW_ADMIN_EVT_SIG = "NewAdmin(address,address)";

    public static COMP_GOV_ADDR = "0xc0Da02939E1441F497fd74F78cE7Decb17B66529";
}