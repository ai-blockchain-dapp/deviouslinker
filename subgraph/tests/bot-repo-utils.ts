import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { BotRegistered } from "../generated/BotRepo/BotRepo"

export function createBotRegisteredEvent(
  botAddress: Address,
  isBot: boolean,
  score: BigInt
): BotRegistered {
  let botRegisteredEvent = changetype<BotRegistered>(newMockEvent())

  botRegisteredEvent.parameters = new Array()

  botRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "botAddress",
      ethereum.Value.fromAddress(botAddress)
    )
  )
  botRegisteredEvent.parameters.push(
    new ethereum.EventParam("isBot", ethereum.Value.fromBoolean(isBot))
  )
  botRegisteredEvent.parameters.push(
    new ethereum.EventParam("score", ethereum.Value.fromUnsignedBigInt(score))
  )

  return botRegisteredEvent
}
