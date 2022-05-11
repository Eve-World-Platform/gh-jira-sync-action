# Github Jira Sync Action

This action transitions the Jira status based on the Github labels

## Inputs

### `GITHUB_TOKEN`

**Required**

### `JIRA_URL`

Jira domain of your organization
**Required**

### `JIRA_EMAIL`

Email id used for the Jira account
**Required**

### `JIRA_TOKEN`

API Token of the corresponding jira account
**Required**

### `JIRA_PROJECT`

IOS or ANDROID
**Required**

## Example usage

```
jobs:
  gh-jira-job:
    runs-on: ubuntu-latest
    steps:
      - name: Gh-Jira sync action
        id: gh-jira
        uses: Eve-World-Platform/gh-jira-sync-action@v1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          JIRA_URL: ${{ secrets.JIRA_URL }}
          JIRA_EMAIL: ${{ secrets.JIRA_EMAIL }}
          JIRA_TOKEN: ${{ secrets.JIRA_TOKEN }}
          JIRA_PROJECT: 'ANDROID'
```
