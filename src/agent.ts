import { 
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType 
} from 'forta-agent'
import { Constants } from './constants'
import GOVERNER_BRAVO_ABI from './GOVERNER_BRAVO_ABI.json';
import { utils } from 'ethers';
import { parseNewAdmin, parseNewImplementation, parseNewPendingAdmin, parseProposalCreated, parseProposalExecuted, parseProposalQueued, parseProposalThresholdSet, parseVoteCast, parseVotingDelaySet, parseVotingPeriodSet } from './description-parsers';

interface EventParser {
  eventSignature: string;
  descriptionParse? (evt: utils.LogDescription): string;
  alertId?: string;
}

// Remove items from this list if considered unnecessary
let EVENT_PARSERS: EventParser[] = [
  {
    eventSignature: Constants.PROPOSAL_CREATED_EVT_SIG,
    alertId: "COMP-GOV-1",
    descriptionParse: parseProposalCreated,
  },
  {
    eventSignature: Constants.VOTE_CAST_EVT_SIG, 
    alertId: "COMP-GOV-2",
    descriptionParse: parseVoteCast,
  },
  {
    eventSignature: Constants.PROPOSAL_CANCELED_EVT_SIG, 
    alertId: "COMP-GOV-3",
    descriptionParse: parseProposalCreated,
  },
  {
    eventSignature: Constants.PROPOSAL_QUEUED_EVT_SIG, 
    alertId: "COMP-GOV-4",
    descriptionParse: parseProposalQueued,
  },
  {
    eventSignature: Constants.PROPOSAL_EXECUTED_EVT_SIG, 
    alertId: "COMP-GOV-5",
    descriptionParse: parseProposalExecuted,
  },
  {
    eventSignature: Constants.VOTING_DELAY_SET_EVT_SIG,
    alertId: "COMP-GOV-6",
    descriptionParse: parseVotingDelaySet,
  },
  {
    eventSignature: Constants.VOTING_PERIOD_SET_EVT_SIG, 
    alertId: "COMP-GOV-7",
    descriptionParse: parseVotingPeriodSet,
  },
  {
    eventSignature: Constants.NEW_IMPLEMENTATION_EVT_SIG,
    alertId: "COMP-GOV-8",
    descriptionParse: parseNewImplementation,
  },
  {
    eventSignature: Constants.PROPOSAL_THRESHOLD_SET_EVT_SIG, 
    alertId: "COMP-GOV-9",
    descriptionParse: parseProposalThresholdSet,
  },
  {
    eventSignature: Constants.NEW_PENDING_ADMIN_EVT_SIG,
    alertId: "COMP-GOV-10",
    descriptionParse: parseNewPendingAdmin,
  },
  {
    eventSignature: Constants.NEW_ADMIN_EVT_SIG,
    alertId: "COMP-GOV-11",
    descriptionParse: parseNewAdmin,
  }
]

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = []

  let compGovInterface = new utils.Interface(GOVERNER_BRAVO_ABI);

  for (let eventParser of EVENT_PARSERS) {
    let events = txEvent.filterEvent(eventParser.eventSignature, Constants.COMP_GOV_ADDR);

    for (let event of events) {
      let parsedEvent = compGovInterface.parseLog(event);

      let description = eventParser.descriptionParse ? eventParser.descriptionParse(parsedEvent) : `Compound Governance V2 ${parsedEvent.name} fired!`;
      let alertId = eventParser.alertId ? eventParser.alertId : "COMP-GOV-0";

      // Convert event params to metadata format with proper keying and drop first half (duplicates)
      let metadata: {[key: string]: string} = {};
      let i = 0;
      for (let arg in parsedEvent.args) {
        i += 1;
        if (i <= parsedEvent.args.length) continue; // Drop first half
        metadata[arg] = parsedEvent.args[arg].toString();
      }

      findings.push(Finding.fromObject({
        name: `Compound Governance V2 ${parsedEvent.name}`,
        description: description,
        alertId: alertId, 
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: metadata
      }))

    }
  }
  return findings
}

export default {
  handleTransaction,
}