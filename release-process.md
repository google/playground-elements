# playground-elements Release Process

This document outlines the process for publishing playground-elements to [npm](https://www.npmjs.com/package/playground-elements).

Prerequisites:

- Must have npm publish permissions for playground-elements. Note: it can take a few hours for the permissions to propagate and allow publishing.

> **Warning**
> This release process has manual steps. At the ⚠️  emoji, proceed with caution.


## Steps

1. Manually create a release PR. Prior examples [#264](https://github.com/google/playground-elements/pull/376) [#245](https://github.com/google/playground-elements/pull/245)
    1. Create a branch from `main`. E.g., `git checkout -b release-vX-XX-X`
    1. Modify the CHANGELOG.md to reflect the release version
    1. Run `npm version --no-git-tag-version [patch|minor|major]` to update `package.json` and `package-lock.json` with the correct version bump. This will also automatically run `npm run update-version-module` and stage the `src/shared/version.ts` file.
    1. Commit and create PR with name “Release <VERSION_NUMBER>”
1. Get code review & tests passing on PR. Squash and merge once approved.
1. Checkout the `main` branch and `git pull`. `git status` and `git log` to ensure on `main` and last commit was the release commit.

> **Warning**
> Manual Publish to NPM - proceed with caution

1. ⚠️  Running `npm publish` will always replace the `latest` tag with the version just published. The `latest` tag is what users get from `npm install playground-elements`. If publishing a pre-release, use `npm publish --no-tag`. Otherwise for a normal release, use `npm publish`.
1. Check https://www.npmjs.com/package/playground-elements to validate that the publish succeeded, or run `npm info playground-elements`
1. Add a [Github Release via this dashboard.](https://github.com/google/playground-elements/releases)
    1. Press “Draft a new release”
    1. Click “Choose a tag” and type in the version that was released. You will create this new tag when publishing the release notes. It will be associated with the latest commit on `main` which is your release.
    1. Release title should be identical to the tag.
    1. In the “describe this release” textbox, copy paste the `CHANGELOG.md` for the release.
    1. Press “Publish release”.


Great job! You've successfully released playground-elements to npm and tagged the release.



Verification links:
 - NPM: https://www.npmjs.com/package/playground-elements
 - Tagged release: https://github.com/google/playground-elements/releases
