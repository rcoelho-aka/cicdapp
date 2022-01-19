pipeline {
    agent any

    stages {

        stage('Setup') {
            steps {
                script {
                    env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Audit') {
            steps {
                sh 'npm audit'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Unit tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build docker image') {
            steps {
                sh "docker build -t ${TAG} ."
            }
        }

        stage('Push to repository') {
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh 'heroku container:login'
                    sh "docker push ${TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }
        }

    }
}