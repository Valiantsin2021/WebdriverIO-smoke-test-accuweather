pipeline {
    agent any

    stages {
        stage('Git download') {
            steps {
                git branch: 'master', url: 'https://github.com/Valiantsin2021/WebdriverIO-smoke-test-accuweather.git'
            }
        }
        stage('Install') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm install'
            }
        }
        stage('smoke') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'npm run smoke'
            }
        }
    }
}
