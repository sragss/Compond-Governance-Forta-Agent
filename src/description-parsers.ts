import { LogDescription } from "@ethersproject/contracts/node_modules/@ethersproject/abi";

export function parseProposalCreated(log: LogDescription): string {
    return `Proposal ${log.args['proposal']} created by ${log.args['proposer']} `
        + `from ${log.args['startBlock']}-${log.args['endBlock']}: ${log.args['description']}.`
}

export function parseVoteCast(log: LogDescription): string {
    var supportString;
    switch (log.args['support']) {
        case 0:
            supportString = "AGAINST"
            break;
        case 1:
            supportString = "FOR"
            break;
        case 0:
            supportString = "ABSTAIN"
            break;
        default:
            supportString = "[INVALID]";
            break;
    }
    return `${log.args['voter']} voted ${supportString} on ${log.args['proposalId']} with ${log.args['votes']} votes.`
}

export function parseCanceled(log: LogDescription): string {
    return `Proposal ${log.args['id']} canceled.`
}

export function parseProposalQueued(log: LogDescription): string {
    return `Proposal ${log.args['id']} queued with eta: ${log.args['eta']}.`
}

export function parseProposalExecuted(log: LogDescription): string {
    return `Proposal ${log.args['id']} executed.`
}

export function parseVotingDelaySet(log: LogDescription): string {
    return `Voting delay updated from ${log.args['oldVotingDelay']} to ${log.args['newVotingDelay']}.`
}

export function parseVotingPeriodSet(log: LogDescription): string {
    return `Voting period updated from ${log.args['oldVotingPeriod']} to ${log.args['newVotingPeriod']}.`    
}

export function parseNewImplementation(log: LogDescription): string {
    return `Implementation has been changed from ${log.args['oldImplementation']} to ${log.args['newImplementation']}.`
}

export function parseProposalThresholdSet(log: LogDescription): string {
    return `Proposal threshold updated from ${log.args['oldProposalThreshold']} to ${log.args['newProposalThreshold']}.`
}

export function parseNewPendingAdmin(log: LogDescription): string {
    return `Admin pending update from ${log.args['oldPendingAdmin']} to ${log.args['newPendingAdmin']}.`
}

export function parseNewAdmin(log: LogDescription): string {
    return `Admin updated from ${log.args['oldAdmin']} to ${log.args['newAdmin']}.`
}