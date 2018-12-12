#!/bin/bash

sfdx force:project:upgrade -f
sfdx muenzpraeger:source:api:set
sfdx force:org:create -a dreaminvest-release-test -s -f config/project-scratch-def.json -d 7
sfdx force:source:push
sfdx force:user:permset:assign -n dreaminvest
sfdx force:apex:test:run
sfdx force:org:open -p /lightning/page/home
echo "Org is set up"
