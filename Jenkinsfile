pipeline {
    agent any

    stages{
        stage('Setup'){
            steps{
                script{
                    env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"
                    //echo env.GitHubApp
                }
            }
        }
        stage('Checkout'){
            steps{
                checkout scm
            }
        }
        stage('Audit'){
            steps{
                //sh "npm audit"
                echo "dummy"
            }
        }
        stage('Unit tests'){
            steps{
                sh "npm install"
                sh "npm test"
            }
        }
        stage('SonarQube') {
            steps {
                withSonarQubeEnv('sonarcloud') {
                    script {
                        def scannerHome = tool 'SonarScanner';
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=rcoelho-aka_cicdapp -Dsonar.organization=rcoelho-aka -Dsonar.sources=src -Dsonar.branch.name=${env.JOB_NAME} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                    }
                }
            }
        }
        stage("Quality Gate"){
            timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true;
            }
        }
        stage('Build'){
            steps{
                sh "docker build -t ${TAG} ."
            }
        }
        stage('Push to registry'){
            when{
                not{
                    anyOf{
                        triggeredBy "SCMTrigger"
                        triggeredBy "TimerTrigger"
                    }
                }
            }
            steps{
                withCredentials([string(credentialsId:'heroku-key', variable:'HEROKU_API_KEY')]){
                    sh "heroku container:login"
                    sh "docker push ${TAG}"
                }
            }
        }
        stage('Deploy'){
            when{
                not{
                    anyOf{
                        triggeredBy "SCMTrigger"
                        triggeredBy "TimerTrigger"
                    }
                }
            }
            steps{
                withCredentials([string(credentialsId:'heroku-key', variable:'HEROKU_API_KEY')]){
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }
        }
    }
}