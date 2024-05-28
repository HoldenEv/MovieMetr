/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  // transform:{
  //   "^.+\\.ts$": "ts-jest"
  // },
  testEnvironment: "node",
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
  }
export default config;
