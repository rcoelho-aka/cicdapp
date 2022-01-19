pipeline {
    agent any

    stages{
        stage('Setup'){
            steps {
                script {
                    env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                }
            }

        }
        stage('Checkout'){
            steps {
                script {
                    checkout scm
                }
            }
        }
                         
        stage('Audit'){
            steps {
                script {
                    sh 'npm audit'
                }
            }
        }
        stage('Unit tests'){
            steps {
                script {
                    sh 'npm install'
                    sh 'npm test'
                }
            }            
        }
        stage('Build'){
            steps {
                script {
                    sh 'docker build -t ${TAG} .'
                }
            }            
        }
        stage('Push to Registry'){
            steps {
                withCredentials([string(credentialsIdf: 'heroku-key', variable: 'HEROKU_API_KEY')]){
                    sh "heroku container:login"
                    sh 'docker push ${TAG}'
                }
            }            
        }
        stage('Deploy'){
            steps {
                withCredentials([string(credentialsIdf: 'heroku-key', variable: 'HEROKU_API_KEY')]){
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }            
        }
    }
}