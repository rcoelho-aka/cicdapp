pipeline {
    agent any 
    stages {
        stage ('Example') {
            steps {
                echo 'Hello World'
            }
        }

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

        stage('Unit tests') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t ${TAG} .'
            }
        }

        stage('Push toRegistry') {
            steps {
                withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]) {
                    sh "heroku container:login"
                    sh 'docker push ${TAG}'
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

        stage('SonarQube') {
            steps {
                withSonarQubeEnv('sonarcloud') {
                    script {
                        def scannerHome = tool 'SonarScanner’;
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=rcoelho-aka_cicdapp -Dsonar.organization=rcoelho-aka-Dsonar.sources=src -Dsonar.branch.name=${env.JOB_NAME} 
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                    }
                }
            }
        }
    }
}

