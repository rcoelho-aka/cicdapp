pipeline{
    agent any
    stages{
        stage('Setup'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "TRIGGER" || env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                script{
                    env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                }
            }
        }
        stage('Checkout'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "TRIGGER" || env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                checkout scm
            }
        }
        stage('Audit'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "TRIGGER" || env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                sh 'npm audit'
            }
        }
        stage('Unit tests'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "TRIGGER" || env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "TRIGGER" || env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                sh 'docker build -t ${TAG} .'
            }
        }
        stage('Push to Registry'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]){
                    sh "heroku container:login"
                    sh "docker push ${TAG}"
                }
            }
        }
        stage('Deploy'){
            when{
                expression{
                    env.SCAN_TEST_BUILD == "FULL"
                }
            }
            steps{
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]){
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }
        }
    }
}