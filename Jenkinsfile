pipeline {
    agent any
 
    tools {
        nodejs "NodeJS 20.14.0" 
    }
 
    environment {
        HEADLESS = "false" 
        PLAYWRIGHT_BROWSERS_PATH = "0" 
    }
 
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Supriya-Morapelli/PlaywrightWithTypescript.git', branch: 'main'
            }
        }
 
        stage('Verify NodeJS Version') {
            steps {
                echo 'Checking Node.js and npm versions...'
                sh 'node -v'
                sh 'npm -v'
            }
        }
 
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
 
        // stage('Install Playwright Browsers') {
        //     steps {
        //         sh 'npx playwright install'
        //     }
        // }
        //
         stage('Install Chromium Only') {
            steps {
                echo 'Installing Chromium only to avoid network issues...'
                sh 'npx playwright install chromium'
            }
        }
 
        stage('Run Tests') {
            steps {
                sh 'npm run e2e:report'
            }
        }
 
        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: '**/cucumber-report.html', allowEmptyArchive: true
            }
        }
    }
 
    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed. Check logs and reports.'
        }
    }
}
 