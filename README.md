# Compound Governance Agent

## Description

[Forta](https://twitter.com/fortaprotocol?lang=en) agent which detects compound governance events (Governance V2 - bravo).

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- COMP-GOV-0 -> COMP-GOV-11 (one for each governance event)
  - Details can be found in  `./src/agent.ts`

## Test Data

The agent behaviour can be verified with the following transactions:
- 0x90b8e1bf9fa358973d731eff243563710323ccc5d45776cebdf3528ab500b8ee (ProposalCreated)
- 0xa80781808b5f3f94bea3ba4bdcc49986de20d8c72f81a1eb30ba19941fc13765 (VoteCast)
- 0xf7dee3a39b6620f2ef265f23ee46dd8944a955e3f369e8a42244760b7094a256(ProposalExecuted)
