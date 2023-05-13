import { BotRegistered as BotRegisteredEvent } from "../generated/BotRepo/BotRepo"
import { BotRegistered } from "../generated/schema"

export function handleBotRegistered(event: BotRegisteredEvent): void {
  let entity = new BotRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.botAddress = event.params.botAddress
  entity.isBot = event.params.isBot
  entity.score = event.params.score

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
