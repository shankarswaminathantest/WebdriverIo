pipeline {
    agent { label 'vc' }

     stages {

        stage('Build - Set up Selenium GRID') {

            steps {
                sh 'docker-compose up -d selenium-hub chrome-dbug firefox-dbug chrome-sleepy chrome-gallant chrome-upbeat chrome-clever chrome-suven'
            }
        }
        stage('Test - Run Automated Tests'){
            steps {
               sh 'docker-compose up rm_wdio-framework'
              }
            }
        }
         post{
         always{
                 sh 'docker-compose down'
                 archiveArtifacts artifacts: 'reports/**'

                 /* `make check` returns non-zero on test failures,
                  * using `true` to allow the Pipeline to continue nonetheless
                  */
                  sh 'make check || true'
                  junit 'reports/junit/*.xml'

                /* publish html
                 * snippet generator doesn't include "target:"
                 */ https://issues.jenkins-ci.org/browse/JENKINS-29711.

                  publishHTML(target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: true,
                  keepAll: true,
                  reportDir: 'reports/html/',
                  reportFiles: 'index.html',
                  reportName: 'Test Report',
                  reportTitles: ''
                  ])
               }
        }
}
