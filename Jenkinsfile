#!/usr/bin/groovy
@Library('github.com/stakater/stakater-pipeline-library@v2.16.11') _

def backupFileName = new Date().format( 'yyyy-MM-dd-HH-mm-ss' )

executeMakeTargets {
    target= "run-tests"
    notifySlack= true
    S3_BUCKET_NAME= "cypress-test-bucket"
    BACKUP_NAME= backupFileName + ".tar.gz"
    REGION= "eu-west-1"
    pushToS3= true
    image= "stakater/builder-tool:terraform-0.11.11-v0.0.13"
    requiredParams= ["BACKUP_NAME"]
}
