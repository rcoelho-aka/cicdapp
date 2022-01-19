pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                script {
                    env.TAG = "registry.heroku.com/${env.JOB.NAME}/web"

                }
            }
        }
    }
}