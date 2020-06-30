# 4. Provide upgrade instructions with new version releases

**Date: 2020-06-30**

## Context

San Blas is a [template repo](https://github.blog/2019-06-06-generate-new-repositories-with-repository-templates/) and not a semver-based library that you can upgrade in the background.

A consequence of this is that after you create a new project from the San Blas template, you're on your own with regards to dependency upgrades or incorporating new features.

Merging changes from the template by configuring it as an upstream repository [is possible](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork), but not really useful. I *want* projects to diverge heavily from the San Blas template repo, which will make this kind of merge pretty painful.

## Decision

Publish a [release](https://github.com/bensmithett/sanblas/releases) for any changes to the `master` branch that includes:

- A description of changes
- Instructions for upgrading from the previous version

## Consequences

Upgrade instructions aren't intended to make your downstream project identical to the template repo or provide instant feature parity, since your project has probably diverged and added, removed or extended features.

I think that's OK. These instructions are simply intended as a guide to help you keep your project *pretty close* to the current *San Blas way* of doing things.
