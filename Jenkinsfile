pipeline {
    agent any

    stages {

            stage ('Setup') {
                steps{             
                    script {
                        env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                    }
                     steps{
                }
            }

             stage ('Checkout') {
                steps {
                    checkout scm
                }
            }

             stage ('Audit') {
                steps {
                    sh 'npm audit'
                }
            }

            stage ('Unit test') {
                steps {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
            
            stage ('Build') {
                steps {
                    sh 'docker build -t ${TAG} .'
                }
            }

            stage ('Push to Registry') {
                steps {
                    withCredentials([string(CredentialsId: 'heorku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:login"
                    sh 'docker push ${TAG}'
                }
            }

            stage ('Deploy') {    
                steps {
                    withCredentials([string(CredentialsId: 'heorku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${end.BUILD_NUMBER} -a ${end.JOB_NAME}"
                    }
                }  
            } 
    }
}