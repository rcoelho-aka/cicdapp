pipeline {
    agent any

    parameters {
        booleanParam(name: 'PUSH_AND_DEPLOY', defaultValue: false, description: 'AFter executing the Pipeline, push and deploy the changes')
    }

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

        stage('SonarQube') {
            steps {
                
                withSonarQubeEnv('sonarcloud') {
                    script {
                        def scannerHome = tool 'SonarScanner';
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=rcoelho-aka_cicdapp -Dsonar.organization=rcoelho-aka -Dsonar.sources=src -Dsonar.branch.name=${env.JOB_NAME} -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                    }
                }

                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build docker image') {
            steps {
                sh "docker build -t ${TAG} ."
            }
        }

        stage('Push to repository') {
            when {
                expression {
                    params.PUSH_AND_DEPLOY 
                }
            }
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh 'heroku container:login'
                    sh "docker push ${TAG}"
                }
            }
        }

        stage('Deploy') {
            when {
                expression {
                    params.PUSH_AND_DEPLOY
                }
            }
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:release web -a ${env.JOB_NAME}"
                    sh "heroku config:set VERSION=${env.BUILD_NUMBER} -a ${env.JOB_NAME}"
                }
            }
        }

    }
}