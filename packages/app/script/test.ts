// Runs the unit and browser suites in turn and passes extra flags, such as CI's coverage flags, to both. With
// coverage on, each suite writes its own report so the browser run does not overwrite the unit run's.
const args = process.argv.slice(2)

for (const suite of ["unit", "browser"]) {
  const coverage = args.includes("--coverage") ? [`--coverage-dir=coverage/${suite}`] : []
  const child = Bun.spawn({
    cmd: [process.execPath, "run", `test:${suite}`, ...args, ...coverage],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  })
  const result = await child.exited
  if (result !== 0) {
    process.exitCode = result
    break
  }
}
