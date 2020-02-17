# DreamInvest Lightning Web Components Sample Application

[![Github Workflow](<https://github.com/trailheadapps/dreaminvest-lwc/workflows/Salesforce%20DX%20(scratch%20org)/badge.svg?branch=master>)](https://github.com/trailheadapps/dreaminvest-lwc/actions?query=workflow%3A%22Salesforce+DX+%28scratch+org%29%22) [![Github Workflow](<https://github.com/trailheadapps/dreaminvest-lwc/workflows/Salesforce%20DX%20(packaging)/badge.svg?branch=master>)](https://github.com/trailheadapps/dreaminvest-lwc/actions?query=workflow%3A%22Salesforce+DX+%28packaging%29%22)

> IMPORTANT: This is the new Lightning Web Components version of the DreamInvest sample application. If you are looking for the Aura version, click [here](https://github.com/trailheadapps/dreaminvest).

![dreaminvest-logo](dreaminvest-logo.png)

DreamInvest is a sample financial services application. It features a mutual fund selector that illustrates standard coding practices and solutions to common problems when building applications with the Lightning Component Framework.

[![Thumbnail](http://img.youtube.com/vi/0gIT8la-GRM/0.jpg)](https://www.youtube.com/watch?v=0gIT8la-GRM)

> This sample application is designed to run on Salesforce Platform. If you want to experience Lightning Web Components on any platform, please visit https://lwc.dev, and try out our Lightning Web Components sample application [LWC Recipes OSS](https://github.com/trailheadapps/lwc-recipes-oss).

## Table of contents

-   Installation Instructions

    -   [Installing DreamInvest using a scratch org](#installing-dreaminvest-using-a-scratch-org)
    -   [Installing DreamInvest using an unlocked package](#installing-dreaminvest-using-an-unlocked-package)
    -   [Completing the Installation](#completing-the-installation)

-   [Optional installation instructions](#optional-installation-instructions)

## Installation Instructions

There are two ways to install DreamInvest:

-   [Using a Scratch Org](#installing-dreaminvest-using-a-scratch-org): This is the recommended installation option. Use this option if you are a developer who wants to experience the app and the code.
-   [Using an Unlocked Package](#installing-dreaminvest-using-an-unlocked-package): This option allows anybody to experience the sample app without installing a local development environment.

### Installing DreamInvest using a Scratch Org

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

-   Enable Dev Hub in your Trailhead Playground
-   Install Salesforce CLI
-   Install Visual Studio Code
-   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

2. If you haven't already done so, authenticate with your hub org and provide it with an alias (**myhuborg** in the command below):

```
sfdx force:auth:web:login -d -a myhuborg
```

3. Clone this repository:

```zsh
git clone https://github.com/trailheadapps/dreaminvest-lwc
cd dreaminvest-lwc
```

4. Create a scratch org and provide it with an alias (**dreaminvest** in the command below):

```zsh
sfdx force:org:create -s -f config/project-scratch-def.json -a dreaminvest
```

5. Push the app to your scratch org:

```zsh
sfdx force:source:push
```

6. Assign the **dreaminvest** permission set to the default user:

```zsh
sfdx force:user:permset:assign -n dreaminvest
```

7. Upload Sector data:

```zsh
sfdx force:data:bulk:upsert -s Sector__c -f ./data/sectors.csv -w 1 -i Sector_Id__c
```

8. Upload Fund data:

```zsh
sfdx force:data:bulk:upsert -s Fund__c -f ./data/funds.csv -w 1 -i Id
```

9. Open the scratch org:

```zsh
sfdx force:org:open -p /lightning/page/home
```

### Installing DreamInvest using an unlocked package

This is the recommended option for non developers. Use this option if you want to experience the sample app but do not plan to modify the code.

1. [Sign up](https://developer.salesforce.com/signup) for a Developer Edition (DE) org.

2. Enable MyDomain in your DE org. Instructions to do this are [here](https://trailhead.salesforce.com/modules/identity_login/units/identity_login_my_domain).

3. Click [this link](https://login.salesforce.com/packaging/installPackage.apexp?p0=04tB0000000AzjAIAS) to install the DreamInvest unlocked package into your developer edition org. Approve the Third-Party access for SCP Trusted Sites during the installation process.

4. Select **Install for All Users**.

5. Load sample data (Sectors):

-   In **Setup**, type **Data Import** in the Quick Find box and click **Data Import Wizard**.
-   Click **Launch Wizard**.
-   Click the **Custom objects** tab, click **Sectors**, and click **Add new records**.
-   Drag **sectors.csv** from the data folder of this project to the upload area.
-   Click **Next**. Use the mapping wizard to map any unmapped fields. The source CSV shows the API names of the fields.
-   Click **Next**, and **Start Import**.

6. Load sample data (Funds):

-   In **Setup**, type **Data Import** in the Quick Find box and click **Data Import Wizard**.
-   Click **Launch Wizard**.
-   Click the **Custom objects** tab, click **Funds**, and click **Add new records**.
-   For _Which Sector field in your file do you want to match against to set the Sector lookup field?_, select **Sector Id (External ID)**.
-   Drag **funds.csv** from the data folder of this project to the upload area.
-   Click **Next**. Use the mapping wizard to map any unmapped fields. The source CSV shows the API names of the fields.
-   Click **Next**, and **Start Import**.

### Completing the installation

Follow the steps below to complete the installation regardless of the installation option you selected above. If you want to experience the StockService.cmp you have to obtain a free API key from [Alphavantage](https://www.alphavantage.co/support/#api-key):

1. In **Setup**, type **theme** in the Quick Find box. Click **Themes and Branding**, click the down arrow to the right of the **Lightning Lite** theme and select **Activate**.

2. In **Setup** type **custom settings** in the quick find box. Click **Custom Settings**, click **Manage** besides **DreamInvest Settings**. Then click **New** (top button), and enter the Alphavantage API key. Click **Save**.

3. In **App Launcher**, select the **DreamInvest** app.

4. Click the **Fund Explorer** tab.

## Optional Installation Instructions

This repository contains several files that are relevant if you want to integrate modern web development tooling to your Salesforce development processes, or to your continuous integration/continuous deployment processes.

### Code formatting

[Prettier](https://prettier.io/) is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](/.prettierignore) and [.prettierrc](/.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

### Code linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintignore](/.eslintignore) file is provided as part of this repository to exclude specific files from the linting process in the context of Lighning Web Components development.

### Pre-commit hook

This repository also comes with a [package.json](/package.json) file that makes it easy to set up a pre-commit hook that enforces code formatting and linting by running Prettier and ESLint every time you `git commit` changes.

To set up the formatting and linting pre-commit hook:

1. Install [Node.js](https://nodejs.org) if you haven't already done so
2. Run `npm install` in your project's root folder to install the ESLint and Prettier modules (Note: Mac users should verify that Xcode command line tools are installed before running this command.)

Prettier and ESLint will now run automatically every time you commit changes. The commit will fail if linting errors are detected. You can also run the formatting and linting from the command line using the following commands (check out [package.json](/package.json) for the full list):

```
npm run lint:lwc
npm run prettier
```
