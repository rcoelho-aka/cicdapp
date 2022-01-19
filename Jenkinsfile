pipeline {
	agent any
	stages {

		stage('Setup') {
			when{ parameter "MODE"}
			steps{
				script{env.TAG = "registry.heroku.com/${env.JOB_NAME}/web"}
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
		stage ('Unit tests'){
			steps {
				sh 'npm install'
				sh 'npm test'
			}
		}
		stage ('build') {
			steps {
				sh  'docker build -t ${TAG} .'
			}
		}
		stage ('Push to registry') {
			when{
				expression{
					env.MODE == "Publish and deploy"
				}
			}

			steps {
				withCredentials([string(credentialsId: 'heroku-key', variable: 'HEROKU_API_KEY')]){
					sh "heroku container:login"
					sh 'docker push ${TAG}'
				}
			}
		}
		stage ('Deploy'){
			when{
				expression{
					env.MODE == "Publish and deploy"
				}
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