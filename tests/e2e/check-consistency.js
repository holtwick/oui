#!/usr/bin/env node
/* eslint-disable antfu/no-top-level-await */
/* eslint-disable node/prefer-global/process */
/* eslint-disable no-console */

/**
 * Screenshot Consistency Checker
 *
 * This script helps verify that screenshot tests produce consistent results
 * by running the same test multiple times and comparing results.
 */

const { execSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const TEST_NAME = process.argv[2] || 'oui-button.*dark=false'
const RUNS = Number.parseInt(process.argv[3]) || 3
const BROWSER = process.argv[4] || 'chromium'

console.log(`🔍 Testing screenshot consistency for: ${TEST_NAME}`)
console.log(`🌐 Browser: ${BROWSER}`)
console.log(`📊 Running ${RUNS} times to check for variations...\n`)

const testResults = []
const tempDir = path.join(__dirname, '../../test-results-temp')

// Clean up any existing temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true })
}

for (let i = 0; i < RUNS; i++) {
  console.log(`🏃 Run ${i + 1}/${RUNS}...`)

  try {
    const startTime = Date.now()

    // Run the test
    execSync(
      `pnpm playwright test --project=${BROWSER} -g "${TEST_NAME}" --reporter=line`,
      {
        cwd: path.join(__dirname, '../../'),
        stdio: 'inherit',
        timeout: 30000,
      },
    )

    const duration = Date.now() - startTime
    testResults.push({ run: i + 1, success: true, duration })
    console.log(`✅ Run ${i + 1} completed in ${duration}ms\n`)
  }
  catch (error) {
    testResults.push({ run: i + 1, success: false, error: error.message })
    console.log(`❌ Run ${i + 1} failed: ${error.message}\n`)
  }

  // Wait a bit between runs to ensure clean state
  await new Promise(resolve => setTimeout(resolve, 1000))
}

// Analyze results
console.log(`\n📈 CONSISTENCY REPORT`)
console.log(`======================`)

const successful = testResults.filter(r => r.success)
const failed = testResults.filter(r => !r.success)

console.log(`✅ Successful runs: ${successful.length}/${RUNS}`)
console.log(`❌ Failed runs: ${failed.length}/${RUNS}`)

if (successful.length > 0) {
  const durations = successful.map(r => r.duration)
  const avgDuration = Math.round(durations.reduce((a, b) => a + b) / durations.length)
  const minDuration = Math.min(...durations)
  const maxDuration = Math.max(...durations)

  console.log(`⏱️  Average duration: ${avgDuration}ms`)
  console.log(`🚀 Fastest run: ${minDuration}ms`)
  console.log(`🐌 Slowest run: ${maxDuration}ms`)

  const variance = maxDuration - minDuration
  if (variance < 1000) {
    console.log(`🎯 Timing consistency: EXCELLENT (variance: ${variance}ms)`)
  }
  else if (variance < 3000) {
    console.log(`👍 Timing consistency: GOOD (variance: ${variance}ms)`)
  }
  else {
    console.log(`⚠️  Timing consistency: NEEDS ATTENTION (variance: ${variance}ms)`)
  }
}

if (failed.length > 0) {
  console.log(`\n❌ FAILED RUNS:`)
  failed.forEach((f) => {
    console.log(`   Run ${f.run}: ${f.error}`)
  })
}

console.log(`\n💡 Tips for improving consistency:`)
console.log(`   - Ensure no other apps are using significant CPU during tests`)
console.log(`   - Run tests with consistent system load`)
console.log(`   - Check that the development server is stable`)
console.log(`   - Different browsers may have slight rendering differences`)
console.log(`\n🌐 Test different browsers:`)
console.log(`   node tests/e2e/check-consistency.js "${TEST_NAME}" ${RUNS} chromium`)
console.log(`   node tests/e2e/check-consistency.js "${TEST_NAME}" ${RUNS} firefox`)
console.log(`   node tests/e2e/check-consistency.js "${TEST_NAME}" ${RUNS} webkit`)
