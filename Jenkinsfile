pipeline{
    agent any
    stges {
        stage('Setup') {
            steps{
                env.TAG = "registry.heruku.com/${env.JOB_NAME}/web"
            }
        }
        stage('Checkout'){
            steps{
                chekout scm
            }
        }
        stage('Audit'){
            steps{
                sh 'npm audit'
            }
        }
        stage('Unit tests'){
            steps{
                sh 'npm insall'
                sh 'npm test'
            }
        }
        stage('Build'){
            steps{
                sh 'docker build -t ${TAG}'
            }
        }
        stage('Push to Registry'){
            steps{
                withCredentials([string](credentialsId: 'heroku-key', variables: 'HEROKU_API_KEY')]){
                    sh "heroku container:login"
                    sh 'docker push ${TAG}'
                }
            }
        }
        stage('Deploy'){
            steps{
                withCredentials([string(credentialsId:'heroku-key', variables: 'HEROKU_API_KEY')]){
                    sh "heroku container: release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NAME} -a ${env.JOB_NAME}"
                }
            }
        }
    }
}