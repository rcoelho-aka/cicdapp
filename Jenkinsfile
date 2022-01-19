pipeline{
    agent any

    stages{
        stage('Setup'){
            when {
                equals expected: "SCMTRIGGER", actual:  env.BUILD_CAUSE
            }
            steps {
                script {
                    env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                }
            }
        }
        stage('Checkout'){
            steps {
                checkout scm
            }
        }
        stage('Audit'){
            when {
                equals expected: "SCMTRIGGER", actual:  env.BUILD_CAUSE
            }
            steps {
                sh 'npm audit'
            }
        }
        stage('Unit Tests'){
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build'){
            steps {
                sh "docker build -t ${TAG} ."
            }
        }
        stage('Push to Registry'){
            when {
                equals expected: "SCMTRIGGER", actual:  env.BUILD_CAUSE
            }            
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]){
                    sh "heroku container:login"
                    sh "docker push ${TAG}"
                }
            }
        }
        stage('Deploy'){
            when {
                equals expected: "SCMTRIGGER", actual:  env.BUILD_CAUSE
            }            
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]){
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }
        }        
    }
}