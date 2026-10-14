import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const entries = await readdir(root, { withFileTypes: true })
const skills = entries.filter((entry) => entry.isDirectory() && entry.name.startsWith('rushdb-'))
if (skills.length === 0) throw new Error('No rushdb-* skill directories found')
for (const skill of skills) {
  const path = join(root, skill.name, 'SKILL.md')
  const content = await readFile(path, 'utf8')
  if (!content.startsWith('---\n') || !content.includes('\n---\n')) {
    throw new Error(`${path} must begin with YAML frontmatter`)
  }
}
console.log(`Validated ${skills.length} RushDB skills.`)
