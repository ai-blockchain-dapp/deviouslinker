import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BotRegistered } from "../generated/schema"
import { BotRegistered as BotRegisteredEvent } from "../generated/BotRepo/BotRepo"
import { handleBotRegistered } from "../src/bot-repo"
import { createBotRegisteredEvent } from "./bot-repo-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let botAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let isBot = "boolean Not implemented"
    let score = BigInt.fromI32(234)
    let newBotRegisteredEvent = createBotRegisteredEvent(
      botAddress,
      isBot,
      score
    )
    handleBotRegistered(newBotRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BotRegistered created and stored", () => {
    assert.entityCount("BotRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BotRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "botAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BotRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "isBot",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "BotRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "score",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
