import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token')

    const octokit = github.getOctokit(token, {userAgent: 'pr-labeler/v1'})
    const context = github.context

    if (!context.payload.issue) {
      throw new Error('Payload received did not contain a valid issue')
    }

    const pullRequest = await octokit.pulls.get({
      ...context.repo,
      pull_number: context.payload.issue.number
    })

    console.log(pullRequest)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
