pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                when { 
                    triggeredBy 'SCMTrigger' 
                    }
                script {
                    env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                }
            }
        }
        stage('Checkout') {
            when { 
                triggeredBy 'SCMTrigger' 
                }
            steps {
                checkout scm
            }
        }
        stage('Audit') {
            when { triggeredBy 'SCMTrigger' }
            steps {
                sh "npm audit"
            }
        }
        stage('Unit tests') {
            when { triggeredBy 'SCMTrigger' }
            steps {
                sh "npm install"
                sh "npm test"
            }
        }
        stage('Build') {
            when { triggeredBy 'UserIdCause' }
            steps {
                sh "docker build -t ${TAG} ."
            }
        }
        stage('Push to Registry') {
            when { triggeredBy 'UserIdCause' }
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:login"
                    sh "docker push ${TAG}"
                }
            }
        }
        stage('Deploy') {
            when { triggeredBy 'UserIdCause' }
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }
        }
    }
}